import React from 'react'
import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'


type Props = {}


const Page = async (props: Props) => {
  const user = await onBoardUser()
  
  if (!user) {
    return redirect('/sign-in')
  }

  if (user.status === 200 || user.status === 201) {
    const firstname = user.data?.firstname ?? '' 
    const lastname = user.data?.lastname ?? ''
    return redirect(`/dashboard/`)
  }

  return redirect('/sign-in')
}

export default Page





