import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// WalletConnect Project ID - if you have one, provide it via env var for
// better stability. You can get a project id at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId && process.env.NODE_ENV === "development") {
	// eslint-disable-next-line no-console
	console.warn(
		"NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect connector will not work."
	);
}

export const config = createConfig({
	chains: [mainnet, base] as const,
	connectors: [
		injected(),
		// Keep using projectId; the walletConnect connector in this wagmi
		// version accepts projectId (and other options) but not `chains` here.
		walletConnect({ projectId: projectId ?? "" }),
		metaMask(),
		safe(),
	],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
	},
});
