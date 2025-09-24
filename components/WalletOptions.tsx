"use client";

import React from 'react'
import { Connector, useConnect } from 'wagmi'

// The WalletOptions component will display 
// our connectors. This will allow users to select a wallet and 
// connect. Below, we are rendering a list of connectors 
// retrieved from useConnect. When the user clicks on a 
// connector, the connect function will connect the 
// users' wallet.

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.id ?? connector.name}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </>
  )
}
// Individual wallet option button
// This component handles the logic for checking if a
// connector is ready and rendering a button for it.
function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  // Use connector.ready when available; fall back to a safe provider check.
  // Some connectors expose a `ready` boolean and/or a `getProvider()` method.
  // Avoid `any` by narrowing to `unknown` and using local type shapes.
  const readyInitial = Boolean((connector as unknown as { ready?: boolean }).ready)
  const [ready, setReady] = React.useState(readyInitial)

  React.useEffect(() => {
    if (readyInitial) return
    let mounted = true;

    (async () => {
      try {
        const maybe = connector as unknown as { getProvider?: () => Promise<unknown>; ready?: boolean }
        if (typeof maybe.getProvider === 'function') {
          const provider = await maybe.getProvider()
          if (mounted) setReady(Boolean(provider))
        } else {
          if (mounted) setReady(Boolean(maybe.ready))
        }
      } catch {
        if (mounted) setReady(Boolean((connector as unknown as { ready?: boolean }).ready))
      }
    })()

    return () => {
      mounted = false
    }
  }, [connector, readyInitial])

  return (
    <button type="button" disabled={!ready} onClick={onClick} className="px-3 py-1 bg-gray-100 rounded">
      {connector.name}
    </button>
  )
}