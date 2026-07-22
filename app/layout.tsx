import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RVJ Treinamento e Desenvolvimento",
  description: "Há mais de 30 anos, a RVJ desenvolve pessoas, fortalece líderes e transforma potencial humano em resultados.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
