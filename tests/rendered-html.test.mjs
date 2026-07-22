import assert from "node:assert/strict";
import test from "node:test";

const expectedTitle = "RVJ Treinamento e Desenvolvimento";
const expectedDescription =
  "Há mais de 30 anos, a RVJ desenvolve pessoas, fortalece líderes e transforma potencial humano em resultados.";
const sectionIds = [
  "inicio",
  "solucoes",
  "varejo",
  "trajetoria",
  "equipe",
  "contato",
];

const decodeHtml = (value) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, codePoint) =>
      String.fromCodePoint(Number(codePoint)),
    )
    .replace(/&#x([\da-f]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16)),
    );

const normalizeText = (markup) =>
  decodeHtml(markup.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const getAttribute = (openingTag, attributeName) => {
  const match = openingTag.match(
    new RegExp(`\\b${attributeName}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"),
  );

  return match ? decodeHtml(match[1] ?? match[2]) : null;
};

const getOpeningTags = (html, tagName) =>
  [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    ([openingTag]) => openingTag,
  );

const getElements = (html, tagName) =>
  [
    ...html.matchAll(
      new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, "gi"),
    ),
  ].map(([element]) => ({
    openingTag: element.slice(0, element.indexOf(">") + 1),
    text: normalizeText(element),
  }));

const getRenderedPage = async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  return response.text();
};

const renderedPage = getRenderedPage();

test("renders the expected document metadata", async () => {
  const html = await renderedPage;
  const [htmlTag] = getOpeningTags(html, "html");
  const [title] = getElements(html, "title");
  const metaTags = getOpeningTags(html, "meta");
  const linkTags = getOpeningTags(html, "link");

  assert.equal(getAttribute(htmlTag, "lang"), "pt-BR");
  assert.equal(title?.text, expectedTitle);
  assert.ok(
    metaTags.some(
      (tag) =>
        getAttribute(tag, "name") === "description" &&
        getAttribute(tag, "content") === expectedDescription,
    ),
    "A descrição institucional deve estar presente nos metadados.",
  );
  assert.ok(
    metaTags.some(
      (tag) =>
        getAttribute(tag, "name") === "codex-preview" &&
        getAttribute(tag, "content") === "development",
    ),
    "A identificação do preview de desenvolvimento deve ser preservada.",
  );
  assert.ok(
    linkTags.some(
      (tag) =>
        getAttribute(tag, "rel")?.split(/\s+/).includes("icon") &&
        getAttribute(tag, "href") === "/favicon.svg",
    ),
    "O favicon oficial da RVJ deve ser declarado.",
  );
});

test("renders all landing page sections with a valid heading hierarchy", async () => {
  const html = await renderedPage;
  const sections = getOpeningTags(html, "section");
  const headings = [
    ...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi),
  ].map(([, level, content]) => ({
    level: level.toLowerCase(),
    text: normalizeText(content),
  }));

  for (const sectionId of sectionIds) {
    assert.ok(
      sections.some((section) => getAttribute(section, "id") === sectionId),
      `A seção #${sectionId} deve ser renderizada.`,
    );
  }

  const h1Headings = headings.filter(({ level }) => level === "h1");
  assert.equal(h1Headings.length, 1, "A página deve ter exatamente um h1.");
  assert.equal(
    h1Headings[0].text,
    "Desenvolvendo pessoas. Fortalecendo líderes. Gerando resultados.",
  );

  const h2Texts = headings
    .filter(({ level }) => level === "h2")
    .map(({ text }) => text);
  for (const expectedHeading of [
    "Desenvolvimento que move pessoas e negócios.",
    "Competências que sustentam a alta performance.",
    "Escola do Varejo Digital",
    "Experiência construída ao lado de grandes marcas.",
    "Nosso time de especialistas.",
    "Empresas melhores são construídas por pessoas melhores.",
  ]) {
    assert.ok(
      h2Texts.includes(expectedHeading),
      `O título de seção "${expectedHeading}" deve ser renderizado como h2.`,
    );
  }
});

test("renders the primary calls to action and both WhatsApp contacts", async () => {
  const html = await renderedPage;
  const anchors = getElements(html, "a").map((anchor) => ({
    href: getAttribute(anchor.openingTag, "href"),
    text: anchor.text,
  }));
  const hasLink = (href, text) =>
    anchors.some(
      (anchor) => anchor.href === href && anchor.text.includes(text),
    );

  assert.ok(
    hasLink("#contato", "Fale com um especialista"),
    "O CTA principal deve levar à seção de contato.",
  );
  assert.ok(
    hasLink("#solucoes", "Conheça nossas soluções"),
    "O CTA secundário deve levar às soluções.",
  );
  assert.ok(
    hasLink("https://escoladovarejo.app", "Conheça a Escola do Varejo"),
    "O CTA da Escola do Varejo deve levar à plataforma oficial.",
  );

  for (const whatsappUrl of [
    "https://wa.me/5515991431518",
    "https://wa.me/5511997663723",
  ]) {
    assert.ok(
      anchors.some(({ href }) => href?.startsWith(whatsappUrl)),
      `O contato ${whatsappUrl} deve estar disponível.`,
    );
  }
});
