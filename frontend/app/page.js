"use client";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import metadata from "../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json";

export default function Home() {
  const [reconstructedArray, setReconstructedArray] = useState([]);
  const [empty, setEmpty] = useState(true);
  const { data } = useReadContract({
    abi: metadata.abi,
    address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
    functionName: 'getAllRegisteredUsers',
  });

  console.log('data', data)
  
  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      if (!data) return;
      const maxLength = Math?.min(...data?.map(arr => arr?.length));
      for (let i = 0; i < maxLength; i++) {
        newArray.push({
          address: data[0][i],
          name: data[1][i],
          bio: data[2][i].trim(),
          major: data[3][i],
          avatar: data[4][i],
        });
      }
      setEmpty(false)
      setReconstructedArray(newArray);
    };
    fetchData();
  }, [data]);

  console.log('reconstructedArray', reconstructedArray)

  return (
    <section>
      <h1 className="text-3xl font-bold p-6">Users</h1>
      <div className="grid gap-4 grid-cols-4">
        {empty ? (
          <div className="my-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            No users yet
          </div>
        ) : (
          reconstructedArray.map((user, index) => (
          <div key={index} className="py-6 w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center w-full">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar}/>
                  <a href={user.address}><h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5></a>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{user.major}</span>
              </div>
          </div>
          ))
        )}
      </div>
    </section>
  );
}