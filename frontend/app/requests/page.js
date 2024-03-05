'use client';
import React, { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import metadata from '../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json';

function Page() {
    const account = useAccount()
    const { writeContract, isSuccess, data: acceptData, error } = useWriteContract();

    const [request, setRequest] = useState([])
    const {data} = useReadContract({
        abi: metadata?.abi,
        address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
        functionName: 'getUserData',
        args: [account.address],
    })
    useEffect(() => {
        data?.map((item, key) => key === 5 && setRequest(item))
    }, [data])

    
    async function acceptFriendRequest(add) {
        writeContract({
            abi: metadata?.abi,
            address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
            functionName: 'acceptFriendRequest',
            args: [add],
        })
        console.log('isSuccess', isSuccess)
        console.log('acceptData', acceptData)
        console.log('error', error)
    }


    

    return (
        <div>
            
            {
                request?.length > 0 ? (
                    request?.map((item, key) => <div key={key} className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 text-2xl">You have a friend request from  <a href={`${item}`}>{item}</a> <button className="bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded" onClick={(e)=>acceptFriendRequest(item)}>Accept request</button></div>)
                ) : (
                    <h1>You have no friend requests</h1>
                )
            }
        </div>
    )
}

export default Page