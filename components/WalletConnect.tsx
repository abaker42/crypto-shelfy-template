
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// ... code with 'any' types ...
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connector, useConnect, useAccount, useDisconnect } from "wagmi";
// Note: if you add more wagmi connectors, ensure they're also added in `Providers.tsx`
// - Uses wagmi connectors list (with readiness checks) to connect Ethereum wallets
// - Uses Solana wallet-adapter's `useWallet` to connect/disconnect Solana wallets

export default function WalletConnect() {
  // ETH (wagmi)
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // SOL (wallet-adapter)
  const { wallet, wallets: solWallets, publicKey, connected, connecting, connect: solConnect, disconnect: solDisconnect } = useWallet();

  const [solError, setSolError] = React.useState<string | null>(null);

  // Helper component: wallet option button with readiness detection
  function WalletOption({ connector, onClick }: { connector: Connector; onClick: () => void }) {
    const readyInitial = Boolean((connector as unknown as { ready?: boolean }).ready);
    const [ready, setReady] = React.useState(readyInitial);

    React.useEffect(() => {
      if (readyInitial) return;
      let mounted = true;

      (async () => {
        try {
          const maybe = connector as unknown as { getProvider?: () => Promise<unknown>; ready?: boolean };
          if (typeof maybe.getProvider === "function") {
            const provider = await maybe.getProvider();
            if (mounted) setReady(Boolean(provider));
          } else {
            if (mounted) setReady(Boolean(maybe.ready));
          }
        } catch {
          if (mounted) setReady(Boolean((connector as unknown as { ready?: boolean }).ready));
        }
      })();

      return () => {
        mounted = false;
      };
    }, [connector, readyInitial]);

    return (
			<button
				type='button'
				disabled={!ready}
				onClick={onClick}
				className={
					ready
						? "px-3 py-1 bg-blue-100 rounded hover:bg-blue-600"
						: "px-3 py-1 bg-gray-100 rounded disabled:cursor-not-allowed"
				}
			>
				{connector.name}
			</button>
		);
  }

  const handleSolConnect = async () => {
		setSolError(null);
		if (!wallet || !(wallet as any).ready) {
			setSolError(
				"Selected wallet is not ready. Make sure the wallet app/extension is installed and unlocked."
			);
			return;
		}

		try {
			await solConnect();
		} catch (err) {
			const name = (err as any)?.name ?? "";
			const message = (err as any)?.message ?? String(err);
			if (name === "WalletNotReadyError") {
				setSolError(
					"Wallet not ready: ensure the wallet extension is installed and unlocked."
				);
			} else {
				setSolError(message || "Failed to connect to wallet.");
			}
			if (process.env.NODE_ENV === "development") {
				// eslint-disable-next-line no-console
				console.error("Solana connect error:", err);
			}
		}
	};

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-4">
        {/* Ethereum / wagmi connectors */}
        {isConnected ? (
          <button type="button" onClick={() => disconnect()} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Disconnect ETH ({address?.slice(0, 6)}…)
          </button>
        ) : (
          connectors.map((connector) => (
            <WalletOption key={connector.id ?? connector.name} connector={connector} onClick={() => connect({ connector })} />
          ))
        )}

        {/* Solana connect */}
        {connected ? (
          <button type="button" onClick={solDisconnect} className="px-4 py-2 bg-purple-500 text-white rounded-lg">
            Disconnect SOL ({publicKey?.toBase58().slice(0, 6)}…)
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSolConnect}
            disabled={!wallet || Boolean(connecting) || !(wallet as any).ready}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            {Boolean(connecting) ? "Connecting…" : "Connect SOL"}
          </button>
        )}
      </div>

      {solError && <div className="text-sm text-red-500">{solError}</div>}

    </div>
  );
}
