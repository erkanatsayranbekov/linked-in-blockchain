'use client'

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "../signup/abi";
import { useParams } from "next/navigation";

export default function Home() {

    const { address } = useParams();

    const account = useAccount();
    const { writeContract, isSuccess } = useWriteContract();

    const data = useReadContract({
        abi: abi,
        address: '0xfF49EDFaaEC8927E48c07D45D2d001Cf27952138',
        functionName: 'profiles',
        args: [address],
    })

    async function requestFriends() {
        const request = writeContract({
            abi: abi,
            address: '0xfF49EDFaaEC8927E48c07D45D2d001Cf27952138',
            functionName: 'sendFriendRequest',
            args: [address],
        })

        console.log('request', request)
    }

    async function acceptFriendRequest() {
        const request = writeContract({
            abi: abi,
            address: '0xfF49EDFaaEC8927E48c07D45D2d001Cf27952138',
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
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-4 sm:col-span-3">
                        <div class="bg-dark shadow rounded-lg p-6">
                            <div class="flex flex-col items-center">
                                <img src={avatar} class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                </img>
                                <h1 class="text-xl font-bold">{username}</h1>
                                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={requestFriends}>Send request</a>
                                    <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onClick={acceptFriendRequest}>Accept request</a>
                                </div>
                            </div>
                            <hr class="my-6 border-t border-gray-300"/>
                        </div>
                    </div>
                    <div class="col-span-4 sm:col-span-9">
                        <div class="bg-dark shadow rounded-lg p-6">
                            <h2 class="text-xl font-bold mb-4">About Me</h2>
                            <p class="text-gray-700">{biography}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
