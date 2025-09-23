"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Link from "next/link";

// If an account is connected, we want to show some basic 
// information, like the connected address and ENS name and 
// avatar. Below, we are using hooks like useAccount, 
// useEnsAvatar and useEnsName to extract this information. 
// We are also utilizing useDisconnect to show a "Disconnect" 
// button so a user can disconnect their wallet.
export function Account() {
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const { data: ensName } = useEnsName({ address });
	const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

	return (
		<div>
			{ensAvatar && <img alt='ENS Avatar' src={ensAvatar} />}
			{address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
			<button onClick={() => disconnect()}>Disconnect</button>

			<Link
				href='/'
				className='mt-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600'
			>
				Go Home 🏠
			</Link>
		</div>
	);
}