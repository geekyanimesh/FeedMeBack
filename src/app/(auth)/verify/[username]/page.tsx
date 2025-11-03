import { verfiySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import axios from 'axios';

const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{username: string}>();

    const form = useForm<z.infer<typeof verfiySchema>>({
        resolver: zodResolver(verfiySchema),
    })

    const onSubmit = async (data: z.infer<typeof verfiySchema>) => {

        try {
           const response = await axios.post(`/api/verify-code`,{
                username: params.username,
                code: data.code

            })
        } catch (error) {
            
        }

    }

  return (
    <div>
      VerifyAccount
    </div>
  )
}

export default VerifyAccount
