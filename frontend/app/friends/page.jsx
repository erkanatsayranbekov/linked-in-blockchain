'use client'
import { useAccount, useReadContract } from "wagmi";
import metadata from "../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json";
import { useEffect, useState } from "react";


export default function Home() {
  const account = useAccount();
  const [friends, setFriends] = useState();

  const {data} = useReadContract({
    abi: metadata.abi,
    address: '0x7DdBD7470A8415545382B4111811b5F4d51F1159',
    functionName: 'getUserData',
    args: [account.address]
  })

  useEffect(() => {
    data?.map((item, key) => key === 4 && setFriends(item))
  }, [data])

  return (
    <section>
      <h1 className="text-3xl font-bold p-6">Friends</h1>
      {
        friends?.map((x) => 
          <div className="my-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href={x}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{x}</h5>
              </a>
          </div>
        )
      }
    </section>
  );
}
