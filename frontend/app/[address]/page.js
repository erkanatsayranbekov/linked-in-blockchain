'use client'

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import metadata from "../signup/abi";
import { useParams } from "next/navigation";

export default function Home() {

    const { address } = useParams();

    const account = useAccount();
    const { writeContract, isSuccess } = useWriteContract();

    const data = useReadContract({
        abi: abi,
        address: '0x1218FC41e50F137527Dabb8ff54e1D03d2B57133',
        functionName: 'profiles',
        args: [address],
    })

    async function requestFriends() {
        const request = writeContract({
            abi: abi,
            address: '0x1218FC41e50F137527Dabb8ff54e1D03d2B57133',
            functionName: 'sendFriendRequest',
            args: [address],
        })

        console.log('request', request)
    }

    async function acceptFriendRequest() {
        const request = writeContract({
            abi: abi,
            address: '0x1218FC41e50F137527Dabb8ff54e1D03d2B57133',
            functionName: 'acceptFriendRequest',
            args: [address],
        })
    }


    const username = data?.data?.[0];
    const biography = data?.data?.[1];
    const avatar = data?.data?.[2];
    const isAuthor = data?.data?.[3];

    console.log('data', data)
    return (
        <section>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-dark shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src={avatar} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                </img>
                                <h1 className="text-xl font-bold">{username}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={requestFriends}>Send request</a>
                                    <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onClick={acceptFriendRequest}>Accept request</a>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300"/>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-dark shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-gray-700">{biography}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
