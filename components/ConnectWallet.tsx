"use client";

import React from "react";
import { Account } from "./Account";
import WalletConnect from "./WalletConnect";
import { useAccount } from "wagmi";

// This component will show either the connected account
// or the wallet connection options.
export default function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return (
		<div className='flex flex-col items-center space-y-4'>
			<WalletConnect />
			<p className='text-sm text-gray-500'>Select a wallet to connect.</p>
		</div>
	);
}
