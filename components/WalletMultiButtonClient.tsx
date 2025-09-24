"use client";

import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Simple client wrapper so `WalletMultiButton` (which expects browser APIs)
// isn't imported from a server component.
export default function WalletMultiButtonClient(props: React.ComponentProps<typeof WalletMultiButton>) {
  return <WalletMultiButton {...props} />;
}
