"use client"
import React, { useEffect, useState } from 'react'
import { useWriteContract , useReadContract , useAccount, cookieStorage } from 'wagmi'
import { NFTStorage, File } from 'nft.storage'
import {abi}  from './abi'
import { ImSpinner } from "react-icons/im";
import { useRouter } from 'next/navigation'

export default function Page() {
  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ4QTNDN0I4MTU0MDQwMjdBODlFMDc2NzA2MjI3YkM4RmZFYzk3NTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwOTA1OTUyMTAyOSwibmFtZSI6ImJsb2NrIn0.xWOUlhbw7EyjgLVpMIxaz5A7GCMM52_w0lE0IkseSQQ'
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
  const { writeContract, isSuccess } = useWriteContract()
  const [file, setFile] = useState()
  const [ formData, setFormData ] = useState({
    username: '',
    biography: '',
    avatar: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  })

  const account = useAccount();
  const {data}= useReadContract({
    abi: abi,
    address: '0xb7787A07564a7100A4a0F8236D99C81596bE5381',
    functionName: 'profiles',
    args: [account.address],
  })


  const [isLoading, setIsLoading] = useState(false)

  async function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }
  
  async function uploadNFT(event) {
    event.preventDefault()
    if (formData.avatar != ''){
      writeContract({
        abi,
        address: '0xfF49EDFaaEC8927E48c07D45D2d001Cf27952138',
        functionName: "signUp",
        args: [
          formData.username,
          formData.biography,
          formData.avatar,
        ],
      })
    } else {

    }
  }
  
  async function handleFileChange(event) {
    setIsLoading(true)
    setFile(event.target.files[0])
    const imageFile = new File([file], 'nft.png', { type: 'image/png' })
    const metadata = await client.store({
      name: formData.username,
      description: formData.biography,
      image: imageFile
    })
    setFormData((prevFormData) => ({ ...prevFormData, avatar: metadata.data.image.href }))
    setIsLoading(false)
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
                  <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                  {
                    isLoading ? (
                      <ImSpinner className=' animate-spin' />
                    )
                      :
                      (
                      <input type="file" name="avatar" id="avatar" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleFileChange}/>
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
