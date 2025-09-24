# Setup and configuration

This document explains how to configure the template for local development and production.

## Required environment variables

Copy `.env.example` to `.env.local` and fill in the values.

- `NEXT_PUBLIC_SOLANA_RPC` - HTTP RPC endpoint for Solana (e.g. QuickNode/Alchemy). Example: `https://your-quicknode-url`.
- `NEXT_PUBLIC_SOLANA_WS` - Optional websocket endpoint for Solana subscriptions. If not set, the template derives a `ws://`/`wss://` URL from `NEXT_PUBLIC_SOLANA_RPC`.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect v2 Project ID. If left empty, the WalletConnect connector will be disabled.

## Creating a WalletConnect project ID

1. Go to https://cloud.walletconnect.com and sign up.
2. Create a new project and copy the Project ID.
3. Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in your `.env.local`.

## Choosing a Solana RPC provider

For production or reliable websocket subscriptions, use a hosted RPC provider such as QuickNode or Alchemy. These providers typically offer separate websocket endpoints; set both `NEXT_PUBLIC_SOLANA_RPC` and `NEXT_PUBLIC_SOLANA_WS`.

## Running locally

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` and test connecting wallets (MetaMask/Injected for Ethereum; Phantom/Solflare for Solana).

## Packaging for distribution

Before distributing the template:

- Remove `.env.local` that contains real credentials.
- Include `README.md`, `SETUP.md`, `LICENSE`, `package.json`, `package-lock.json`/`pnpm-lock.yaml`, `.env.example`, and the `app/`, `components/`, and `lib/` directories in your zip.
- Optionally add a `pack` script to `package.json` that builds and zips the clean distribution.
