"use client";

import React from "react";
import Providers from "./Providers";

export default function ProvidersClient({ children }: { children: React.ReactNode }) {
  // Simple client-side wrapper so server components can import a client module
  // without using next/dynamic({ ssr: false }). This file is intentionally
  // marked `use client` so it only runs on the client.
  return <Providers>{children}</Providers>;
}
