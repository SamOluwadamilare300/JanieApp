'use server'
import { client } from '@/lib/prisma'
import { INTEGRATIONS } from '@prisma/client'

export const updateIntegration = async (
  token: string,
  expire: Date,
  id: string
) => {
  return await client.integrations.update({
    where: { id },
    data: {
      token,
      expiresAt: expire,
    },
  })
}

// export const getIntegration = async (clerkId: string, platform: INTEGRATIONS) => {
//   return await client.user.findUnique({
//     where: {
//       clerkId,
//     },
//     select: {
//       integrations: {
//         where: {
//           name: platform,
//         },
//       },
//     },
//   })
// }

// export const createIntegration = async (
//   clerkId: string,
//   platform: INTEGRATIONS,
//   token: string,
//   expire: Date,
//   platformId?: string
// ) => {
//   return await client.user.update({
//     where: {
//       clerkId,
//     },
//     data: {
//       integrations: {
//         create: {
//           name: platform,
//           token,
//           expiresAt: expire,
//           ...(platform === 'INSTAGRAM' && { instagramId: platformId }),
//           ...(platform === 'FACEBOOK' && { facebookId: platformId }),
//           ...(platform === 'TWITTER' && { twitterId: platformId }),
//         },
//       },
//     },
//     select: {
//       firstname: true,
//       lastname: true,
//     },
//   })
// }