'use client'
import { useReadContract } from "wagmi";
import { abi } from "@/artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json";


export default function Home() {
  const data = useReadContract({
    abi: abi,
    address: '0xfF49EDFaaEC8927E48c07D45D2d001Cf27952138',
    functionName: 'getFriends',
  })

  console.log('x', data)

  return (
    <section>
      <h1 className="text-3xl font-bold p-6">Friends</h1>
      {
        data?.data?.map((x) => 
          <div class="my-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href={x}>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{x}</h5>
              </a>
          </div>
        )
      }
    </section>
  );
}
