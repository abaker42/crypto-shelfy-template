import WalletConnect from "@/components/WalletConnect";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";

export default function HomePage() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
			<h1 className="text-4xl font-bold mb-6">🚀 Crypto Shelfy Template</h1>
			<p className="mb-6 text-lg text-gray-600">A Next.js template with wallet connect + token gating.</p>

			<ConnectWallet />

			<Link href="/gated" className="mt-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600">
				Go to Gated Content →
			</Link>
		</main>
	);
}
