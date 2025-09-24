"use client";

import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { config } from "@/lib/config";

// Import the wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => new QueryClient());

	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
	const network = WalletAdapterNetwork.Devnet;

	// You can also provide a custom RPC endpoint
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	// Create wallet adapter instances and memoize so the adapters aren't
	// recreated on every render (which can break provider initialization).
	const wallets = React.useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter(),
			new CoinbaseWalletAdapter(),
		],
		[]
	);

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
						<WalletModalProvider> {children} </WalletModalProvider>
					</WalletProvider>
				</ConnectionProvider>
			</QueryClientProvider>
		</WagmiConfig>
	);
}
