# Setup and configuration

This document explains how to configure the template for local development and production.

## Required environment variables

Copy `example-ENV.txt` to `.env.local` and fill in the values. (or just rename the file)

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

## DEV NOTE
Token Gating only checks if a wallet is connected. For token/NFT ownership checks upgrade to premium version [LinkComingSoon].
