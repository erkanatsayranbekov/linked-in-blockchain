"use client"
import React, { useEffect, useState, useRef  } from 'react';
import { useWriteContract , useReadContract , useAccount, cookieStorage } from 'wagmi';
import metadata  from '../../artifacts/contracts/LinkedIn.sol/ProfessionalNetworking.json';
import { ImSpinner } from "react-icons/im";
import { useRouter } from 'next/navigation';


export default function Page() {
  const { writeContract, isSuccess } = useWriteContract()
  const [isLoading, setIsLoading] = useState(false)
  const inputFile = useRef(null);
  const router = useRouter();
  const [ formData, setFormData ] = useState({
    username: '',
    biography: '',
    major: '',
    avatar: '',
  });

  const uploadFile = async (fileToUpload) => {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setFormData((prevFormData) => ({ ...prevFormData, avatar: `https://lime-genuine-planarian-53.mypinata.cloud/ipfs/${resData.IpfsHash}` }))
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    uploadFile(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  })

  const account = useAccount();
  const { data }= useReadContract({
    abi: metadata.abi,
    address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
    functionName: 'profiles',
    args: [account.address],
  })

  async function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }
  
  async function uploadNFT(event) {
    event.preventDefault()
    console.log(formData)
    if (formData.avatar != ''){
      writeContract({
        abi:metadata.abi,
        address: '0x1DAC27Cb4F6F9a8D3382d42DBF07109eB08f411F',
        functionName: "signUp",
        args: [
          formData.username,
          formData.biography,
          formData.major,
          formData.avatar,
        ],
      })
    }
  }
  

  return (
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto p-6">
      <a href="#" className="flex items-center mb-6 text-5xl font-semibold text-gray-900 dark:text-white">
         Join our community
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-2">
              <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" onChange={(e) => handleInputChange(e)}/>
              </div>
              <div>
                  <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                  <textarea name="biography" rows="4" id="biography" placeholder="Write something about yourself" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" required="" onChange={(e) => handleInputChange(e)}></textarea>
              </div>
              <div>
                  <label htmlFor="major" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Major</label>
                  <input type="text" name="major" id="major" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Major" required="" onChange={(e) => handleInputChange(e)}/>
              </div>
              <div>
                  <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                  {
                    isLoading ? (
                      <ImSpinner className=' animate-spin' />
                    )
                      :
                      (
                      <input type="file"  name="avatar" id="avatar" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={inputFile} onChange={handleChange} />
                      )
                  }
              </div>
                  
              <button 
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                onClick={(e)=>uploadNFT(e)} 
                disabled={isLoading ? true : false}
              >
                Create an account
              </button>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                     Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
               </p>
            </form>
          </div>
      </div>
  </div>
</section>
  )
}
