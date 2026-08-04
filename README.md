# RVJ Treinamento e Desenvolvimento

Site institucional da RVJ, focado na apresentação das soluções de desenvolvimento
de pessoas, liderança, performance comercial e Escola do Varejo Digital.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS/PostCSS
- Vercel

## Requisitos

- Node.js `>=22.13.0`
- npm

## Desenvolvimento local

```bash
npm ci
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run build
```

O lint valida os arquivos TypeScript e React. O build executa a compilação de
produção, a checagem de tipos e a geração das páginas estáticas.

## Estrutura principal

- `app/`: páginas, componentes e estilos globais.
- `public/`: imagens, logos de clientes, fontes e favicon.
- `next.config.ts`: configuração do Next.js.
- `vercel.json`: identificação do projeto na Vercel.

## Deploy

O repositório está integrado ao projeto `rvj-treinamento` na Vercel:

- branches diferentes de `master` geram previews para validação;
- merges em `master` geram automaticamente um deploy de produção;
- o domínio de produção é <https://rvj-treinamento.vercel.app/>.

Não execute um deploy manual de produção após o merge, pois a integração com o
GitHub já inicia a publicação automaticamente.

## Configuração externa

O site não depende atualmente de banco de dados, migrações ou variáveis de
ambiente para compilar e publicar.
