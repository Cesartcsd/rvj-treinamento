import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, constants as zlibConstants } from "node:zlib";

import { startProdServer } from "vinext/server/prod-server";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const compressibleExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".rsc",
  ".svg",
  ".txt",
  ".wasm",
  ".xml",
]);

const staticFileCacheUrl = new URL(
  "../node_modules/vinext/dist/server/static-file-cache.js",
  import.meta.url,
);
const { StaticFileCache } = await import(staticFileCacheUrl.href);
const createStaticFileCache = StaticFileCache.create.bind(StaticFileCache);

StaticFileCache.create = async (clientDirectory) => {
  const cache = await createStaticFileCache(clientDirectory);
  if (!(cache.entries instanceof Map)) {
    throw new Error("Unsupported vinext static cache structure.");
  }

  if (process.platform === "win32") {
    for (const [pathname, entry] of [...cache.entries]) {
      const normalizedPathname = pathname.replaceAll("\\", "/");
      if (normalizedPathname === pathname) {
        continue;
      }

      cache.entries.delete(pathname);
      cache.entries.set(normalizedPathname, entry);
    }
  }

  const compressedEntries = new Set();
  for (const entry of cache.entries.values()) {
    if (compressedEntries.has(entry)) {
      continue;
    }
    compressedEntries.add(entry);

    const extension = path.extname(entry.original.path).toLowerCase();
    if (
      entry.br ||
      entry.original.size < 1_024 ||
      !compressibleExtensions.has(extension)
    ) {
      continue;
    }

    const source = entry.original.buffer ?? fs.readFileSync(entry.original.path);
    const compressed = brotliCompressSync(source, {
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 4,
      },
    });

    entry.br = {
      path: entry.original.path,
      size: compressed.length,
      buffer: compressed,
      headers: {
        ...entry.original.headers,
        "Content-Encoding": "br",
        "Content-Length": String(compressed.length),
        Vary: "Accept-Encoding",
      },
    };
    entry.original.headers.Vary = "Accept-Encoding";
    entry.notModifiedHeaders.Vary = "Accept-Encoding";
  }

  return cache;
};

const args = process.argv.slice(2);
let port = Number(process.env.PORT ?? 3000);
let host = "0.0.0.0";

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];

  if (argument === "-p" || argument === "--port") {
    port = Number(args[index + 1]);
    index += 1;
  } else if (argument.startsWith("--port=")) {
    port = Number(argument.slice("--port=".length));
  } else if (argument === "-H" || argument === "--hostname") {
    host = args[index + 1];
    index += 1;
  } else if (argument.startsWith("--hostname=")) {
    host = argument.slice("--hostname=".length);
  } else if (argument === "-h" || argument === "--help") {
    console.log("Usage: npm start -- [-p <port>] [-H <hostname>]");
    process.exit(0);
  } else {
    throw new Error(`Unsupported start option: ${argument}`);
  }
}

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error(`Invalid port: ${port}`);
}

if (!host) {
  throw new Error("Hostname cannot be empty.");
}

const { server } = await startProdServer({
  port,
  host,
  outDir: path.join(projectRoot, "dist"),
});

const shutdown = () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5_000).unref();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
