'use client'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import OtpForm from './OtpForm';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('signup_verified')) {
      router.push('/contractor/register')
    }
  }, [router])

  return (
    <OtpForm />
  )
}

export default Page
