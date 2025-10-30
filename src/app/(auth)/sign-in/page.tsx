"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from "next/router"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios from 'axios'
import { ApiResponse } from "@/types/apiResponse"

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username,300);
  const router = useRouter();

  // zod implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/checkUsernameUnique?
            username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
        }finally{
          setIsCheckingUsername(false);
        }
      }
    }
  },
  [debouncedUsername]
)

  return (
    <div>
      
    </div>
  )
}

export default page
