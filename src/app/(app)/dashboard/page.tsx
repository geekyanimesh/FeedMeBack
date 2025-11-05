'use client';

import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string)  => {
    setMessages(messages.filter((message)=>message._id !== messageId))
  }

  const {data: session} = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })

  const {register, watch, setValue} = form;

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async ()=>{
    setIsSwitchLoading(true)
    try {
     const response = await axios.get<ApiResponse>('/api/accept-messages');
     setValue('acceptMessages', response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
    } finally{
      setIsSwitchLoading(false);
    }
  },[setValue])

  return (
    <div>
      dashboard
    </div>
  )
}

export default page
