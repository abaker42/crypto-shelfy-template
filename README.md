This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# crypto-shelfy-template
MVP Landing Page with WalletConnect + Token Gated Content

## Solana RPC configuration

You can configure the Solana RPC and websocket endpoints via environment variables in your local environment or `.env` file:

- `NEXT_PUBLIC_SOLANA_RPC` - HTTP RPC endpoint (e.g. a QuickNode/Alchemy URL). Defaults to the public Devnet RPC: `https://api.devnet.solana.com`.
- `NEXT_PUBLIC_SOLANA_WS` - Websocket endpoint for subscriptions. If not set the code will derive a `ws://`/`wss://` URL from `NEXT_PUBLIC_SOLANA_RPC` by switching the protocol.

Setting these helps avoid subscription interruptions when using providers that require a separate websocket URL.

## Preparing this template for distribution

Before bundling or selling this template, please take these steps:

- Remove or do not commit any `.env.local` that contains real API keys or project IDs. Add a `.env.example` (included) instead so buyers can configure their own keys.
- Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set by buyers if they want WalletConnect v2 support — WalletConnect requires a valid project id from https://cloud.walletconnect.com.
- Update `package.json` metadata (`name`, `version`, `description`, `author`, `repository`) to reflect your product and licensing.
- Include a `LICENSE` (this repo includes an MIT example). If you plan to sell a commercial license, replace the file and legal text accordingly.

Packaging checklist:

1. Remove `.next`, `node_modules`, and any local-only files before zipping.
2. Keep `README.md`, `LICENSE`, `package.json`, `package-lock.json`/`pnpm-lock.yaml`, `app/`, `components/`, `lib/`, and `.env.example` in the distribution.
3. Optionally include a short `SETUP.md` with steps to create a WalletConnect project id and configure Solana RPC providers (QuickNode/Alchemy).

If you'd like, I can add a `pack` npm script to create a clean zip of the project ready for distribution.