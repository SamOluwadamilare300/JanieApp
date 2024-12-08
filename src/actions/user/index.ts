'use server'

// import { createUser, findUser, updateSubscription } from './queries'
// import { updateIntegration } from '../integrations/queries'
// import { refreshToken } from '@/lib/fetch'

// export const onCurrentUser = async () => {
//  // Placeholder user ID for development
//  return { id: 'dev-user-123' }
// }

// export const onBoardUser = async () => {
//  const user = await onCurrentUser()
//  try {
//    const found = await findUser(user.id)
//    if (found) {
//      if (found.integrations.length > 0) {
//        const today = new Date()
//        const time_left =
//          found.integrations[0].expiresAt?.getTime()! - today.getTime()

//        const days = Math.round(time_left / (1000 * 3600 * 24))
//        if (days < 5) {
//          console.log('refresh')

//          const refresh = await refreshToken(found.integrations[0].token)

//          const today = new Date()
//          const expire_date = today.setDate(today.getDate() + 60)

//          const update_token = await updateIntegration(
//            refresh.access_token,
//            new Date(expire_date),
//            found.integrations[0].id
//          )
//          if (!update_token) {
//            console.log('Update token failed')
//          }
//        }
//      }

//      return {
//        status: 200,
//        data: {
//          firstname: found.firstname,
//          lastname: found.lastname,
//        },
//      }
//    }
//    const created = await createUser(
//      user.id,
//      'Dev', // Hardcoded first name
//      'User', // Hardcoded last name
//      'dev@example.com' // Hardcoded email
//    )
//    return { status: 201, data: created }
//  } catch (error) {
//    console.log(error)
//    return { status: 500 }
//  }
// }

// export const onUserInfo = async () => {
//  const user = await onCurrentUser()
//  try {
//    const profile = await findUser(user.id)
//    if (profile) return { status: 200, data: profile }

//    return { status: 404 }
//  } catch (error) {
//    return { status: 500 }
//  }
// }

// export const onSubscribe = async (session_id: string) => {
//  const user = await onCurrentUser()
//  try {
//    // Placeholder for Stripe session retrieval
//    console.log('Subscription session:', session_id)
   
//    const subscribed = await updateSubscription(user.id, {
//      customerId: 'placeholder-customer-id',
//      plan: 'PRO',
//    })

//    if (subscribed) return { status: 200 }
//    return { status: 401 }
//  } catch (error) {
//    console.log(error)
//    return { status: 500 }
//  }
// }

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";


export const onCurrentUser  = async () => {
  const user = await currentUser()
  if (!user) return redirect('/sign-in')

    return user
}

export const onBoardUser = async () => {
  const user = await onCurrentUser ()
  try{
    const found = await findUser(user.id)
    if (found) {
      if (found.integrations.length>0){
      const today =new Date()
      const time_left = found.integrations[0].expiresAt?.getTime()! - today.getTime()

      const days = Math.round(time_left / (1000 * 3600 * 24))
      if (days < 5) {
        console.log('refresh')
        const refresh = await refreshToken(found.integrations[0].token)

        const today = new Date()
        const expire_date = today.setDate(today.getDate()+ 60)
        const update_token = await  updateIntegration(
          refresh.access_token,
          new Date(expire_date),
          found.integrations[0].id
        )
        if (!update_token){
          console.log('Update token failed')
        }
      }

      }
      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      }
    }
    const created = await createUser(user.id, user.firstName!, 
      user.lastName!, user.emailAddresses[0].emailAddress)
  }catch (error) {
    console.log(error)
    return {status: 500}
  }
   
}

export const onUserInfo = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    if (profile) return { status: 200, data: profile }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

