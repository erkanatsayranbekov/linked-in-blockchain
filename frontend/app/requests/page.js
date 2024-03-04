'use client';
import React from 'react'
import { useReadContract } from 'wagmi';
import metadata from '../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json';

function Page() {
    const data = useReadContract({
        abi: metadata.abi,
        address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
        functionName: 'getFriendRequestsReceived',
    })
    console.log('data', data)
    return (
        <div>Page</div>
    )
}

export default Page