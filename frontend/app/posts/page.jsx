"use client";
import React, { useEffect, useState } from 'react'
import { useReadContract } from "wagmi";
import metadata from '../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json';

function Page() {
    const [contents, setContents] = useState([])
    const { data } = useReadContract({
        abi: metadata.abi,
        address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
        functionName: 'getAllPosts',
    });
    useEffect(() => {
        if (data && data?.length > 0) {
            const maxLength = Math.min(data[0].length, data[1].length);
            const newArray = [];
            for (let i = 0; i < maxLength; i++) {
                newArray.push({
                    address: data[0][i],
                    content: data[1][i],
                });
            }
            setContents(newArray);
        }
    }, [data]);
    
    
    
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold ">Posts Page</h1>
                <a href="posts/create" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create post</a>
            </div>
            <div>
                {contents?.map((post, index) => (
                    <div key={index} className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-6 max-w-md md:max-w-2xl ">
                       <div className="flex items-start px-4 py-6">
                          <div className="">
                             <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.address}</h2>
                             </div>
                             <p className="text-white"></p>
                             <p className="mt-3 text-white text-sm">
                                {post.content}
                             </p>
                             <div className="mt-4 flex items-center">
                                <div className="flex text-white text-sm mr-3">
                                   <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                                <div className="flex text-white text-sm mr-8">
                                   <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                   </svg>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page