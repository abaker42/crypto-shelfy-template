"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Image from "next/image";

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
			{ensAvatar && (
				<Image width={48} height={48} alt='ENS Avatar' src={ensAvatar} />
			)}
			{address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
			<button className ='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
				onClick={() => disconnect()}
			>
				Disconnect
			</button>
		</div>
	);
}