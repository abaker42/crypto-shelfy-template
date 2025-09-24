//Logic for token gating access
// components/TokenGate.tsx
"use client";

import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

// Simple token gate component that checks if a user is connected
// with either an Ethereum or Solana wallet. Replace the `hasAccess`
// logic with real token ownership checks as needed.
export default function TokenGate({ children }: { children: React.ReactNode }) {
    // ETH (wagmi)
  const { address, isConnected } = useAccount();
    // SOL (wallet-adapter)
  const { connected, publicKey } = useWallet();

  // Replace with real check (NFT ownership, ERC20 balance, SPL token balance, etc.)
  const hasAccess = isConnected || connected;

  if (!hasAccess) {
    return (
			<div className='p-6 text-center'>
				<p className='text-lg font-semibold'>🔒 This content is token-gated.</p>
				<p className='text-sm text-gray-500'>
					Please connect your ETH or SOL wallet to continue.
				</p> <br />
				<Link
					href='/'
					className='mt-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600'
				>
					Go Home 🏠
				</Link>
			</div>
		);
  }

  return <>{children}</>;
}
