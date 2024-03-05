'use client';
import React, { useState } from 'react'
import { useWriteContract } from 'wagmi';
import metadata from '../../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json';
import { useRouter } from 'next/navigation';

function Page() {
    const { writeContract, isSuccess, data: acceptData, error } = useWriteContract();
    const [content, setContent] = useState('')
    const router = useRouter();

    async function createPost() {
        console.log('content', content)
        writeContract({
            abi: metadata?.abi,
            address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
            functionName: 'createPost',
            args: [content],
        })
        router.push('/posts')
        console.log('isSuccess', isSuccess)
        console.log('acceptData', acceptData)
        console.log('error', error)
    }

    function handleChange(e) {
        console.log('first', e.target.value)
        setContent(e.target.value)
    }

  return (
    <div>
        <div className=' flex justify-between'>
            <a href="posts">&larr; Back</a>
            <p>Post Creation Page</p>
        </div>
        <h1 className='text-3xl py-6'>Create New Post</h1>
        <textarea className="w-full h-64 border border-gray-300 rounded-md p-2 bg-transparent text-white" placeholder="Write your post here..." onChange={handleChange}></textarea>
        <button onClick={createPost} className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Create</button>
    </div>
  )
}

export default Page