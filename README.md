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
## DEV NOTE
Token Gating only checks if a wallet is connected. For token/NFT ownership checks upgrade to premium version [LinkComingSoon].


See `SETUP.md` for step-by-step setup and configuration guidance for WalletConnect and Solana RPC providers.