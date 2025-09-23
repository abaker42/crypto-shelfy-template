"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { config } from "@/lib/config";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  // Create wallet adapter instances and memoize so the adapters aren't
  // recreated on every render (which can break provider initialization).
  const wallets = React.useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new CoinbaseWalletAdapter()],
    []
  );

  // RPC endpoint configuration: prefer an explicit environment variable so
  // users can configure a provider (QuickNode/Alchemy/etc.). Fall back to
  // Solana Devnet public RPC. Many RPC providers expose a separate websocket
  // endpoint; derive a default `wsEndpoint` by switching the protocol to ws(s).
  const endpoint =
    (process.env.NEXT_PUBLIC_SOLANA_RPC as string) || "https://api.devnet.solana.com";
  const wsEndpoint =
    (process.env.NEXT_PUBLIC_SOLANA_WS as string) || endpoint.replace(/^http/, "ws");

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug("Solana providers mounted", { endpoint, wsEndpoint, wallets: wallets.length });
    }
  }, [endpoint, wsEndpoint, wallets.length]);

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            autoConnect
            onError={(error) => {
              if (process.env.NODE_ENV === "development") {
                // eslint-disable-next-line no-console
                console.error("Solana WalletAdapter error:", error);
              }
            }}
          >
            {children}
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
