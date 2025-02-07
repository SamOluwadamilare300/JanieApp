import { client } from '@/lib/prisma'
import { INTEGRATIONS, Prisma } from '@prisma/client'

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

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: INTEGRATIONS.INSTAGRAM, // Ensure the name field matches the enum
        },
      },
    },
  })
}

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          name: INTEGRATIONS.INSTAGRAM,
          token,
          expiresAt: expire,
          instagramId: igId ?? null, 
        }as Prisma.IntegrationsCreateWithoutUserInput,
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  })
}