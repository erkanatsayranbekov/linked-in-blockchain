'use client'
import { useReadContract } from "wagmi";
import metadata from "../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json";


export default function Home() {
  const data = useReadContract({
    abi: metadata.abi,
    address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
    functionName: 'getFriends',
  })

  console.log('x', data)

  return (
    <section>
      <h1 className="text-3xl font-bold p-6">Friends</h1>
      {
        data?.data?.map((x) => 
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
