'use client'
import { useReadContract } from "wagmi";
import metadata from "../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json" ;


export default function Home() {
  const {data} = useReadContract({
    abi: metadata.abi,
    address: '0x1218FC41e50F137527Dabb8ff54e1D03d2B57133',
    functionName: 'getAllRegisteredUsers',
  })

  const reconstructedArray = [];
  for (let i = 0; i < data?.length; i += 4) {
    const item = data?.slice(i, i + 4);
    reconstructedArray.push({
      address: item[0][0],
      name: item[1][0],
      bio: item[2][0],
      avatar: item[3][0]
    });
  }
  console.log('getAllRegisteredUsers', reconstructedArray)

  return (
    <section>
      <h1 className="text-3xl font-bold p-6">Users</h1>
      {
        reconstructedArray?.map((user, index) => 
        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar}/>
                <a href={user.address}><h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5></a>
                <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                </div>
            </div>
        </div>

          
        )
      }
    </section>
  );
}
