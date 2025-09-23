//ETH+SOL wallet connection

// components/WalletConnect.tsx
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletConnect() {
  // ETH (wagmi)
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // SOL (wallet-adapter)
  const { publicKey, connected, connect: solConnect, disconnect: solDisconnect } = useWallet();

  return (
    <div className="flex space-x-4">
      {isConnected ? (
        <button type="button" onClick={() => disconnect()} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          Disconnect ETH ({address?.slice(0, 6)}…)
        </button>
      ) : (
        connectors.map((connector) => (
          <button
            key={connector.id ?? connector.name}
            type="button"
            disabled={!connector.ready}
            onClick={() => {
              connect({ connector })
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Connect ETH {connector.name ? `(${connector.name})` : ""}
          </button>
        ))
      )}

      {connected ? (
        <button type="button" onClick={solDisconnect} className="px-4 py-2 bg-purple-500 text-white rounded-lg">
          Disconnect SOL ({publicKey?.toBase58().slice(0, 6)}…)
        </button>
      ) : (
        <button type="button" onClick={() => solConnect()} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Connect SOL
        </button>
      )}
    </div>
  );
}
