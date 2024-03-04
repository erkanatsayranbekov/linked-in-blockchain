'use client'

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import metadata from "../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json";
import { useParams } from "next/navigation";

export default function Home() {

    const { address } = useParams();
    const { writeContract, isSuccess, data: profile } = useWriteContract();

    const data = useReadContract({
        abi: metadata.abi,
        address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
        functionName: 'profiles',
        args: [address],
    })

    async function requestFriends() {
        writeContract({
            abi: metadata.abi,
            address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
            functionName: 'sendFriendRequest',
            args: [address],
        })
        console.log('address', address)
        console.log('request', profile)
        console.log('request-2', isSuccess)
    }

    async function acceptFriendRequest() {
        writeContract({
            abi: metadata.abi,
            address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
            functionName: 'acceptFriendRequest',
            args: [address],
        })
    }


    const username = data?.data?.[0];
    const biography = data?.data?.[1];
    const major = data?.data?.[2];
    const avatar = data?.data?.[3];
    const isAuthor = data?.data?.[5];
    return (
        <section>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-dark shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src={avatar} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                                </img>
                                <h1 className="text-xl font-bold">@{username}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={requestFriends}>Send request</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onClick={acceptFriendRequest}>Accept request</button>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300"/>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-dark shadow rounded-lg p-6 flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Major</h2>
                            <p className="text-gray-700">{major}</p>
                            <h2 className="text-xl font-bold">About Me</h2>
                            <p className="text-gray-700">{biography}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
