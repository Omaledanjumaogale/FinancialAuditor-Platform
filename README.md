# FinancialAuditor Intelligence Platform

An enterprise-grade financial auditing and intelligence platform built with SvelteKit, Convex, and Tailwind CSS.

## Key Features

- **Enterprise-Grade UI/UX**: Premium light-first design with world-class SaaS aesthetics.
- **SvelteKit 5**: Leveraging the latest Svelte features for optimal performance.
- **Convex Backend**: Real-time database and serverless functions.
- **Firebase Integration**: Secure authentication and file storage.
- **Multi-Modal AI Extraction**: Intelligent data processing for audit workflows.
- **FIRS & CAC Compliance**: Built-in frameworks for Nigerian regulatory standards.

## Development

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.14.1 create --template minimal --types ts --add tailwindcss="plugins:none" sveltekit-adapter="adapter:cloudflare+cfTarget:pages" prettier eslint --no-install .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
