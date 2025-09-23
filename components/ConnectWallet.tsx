"use client";

import React from "react";
import { Account } from "./Account";
import { WalletOptions } from "./WalletOptions";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
