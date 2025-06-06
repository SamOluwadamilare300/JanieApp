
'use client'

import React from 'react'

import { Separator } from '@/components/ui/separator'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import { usePaths } from '@/hooks/use-nav'
import { LogoSmall } from '@/svg/logo-small'
import Items from './items'
import ClerkAuthState from '../clerk-auth-state'
import UpgradeCard from './upgrade'

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths()

  return (
    <div
      className="w-[250px] 
    border-[1px]
    radial 
    fixed 
    left-0 
    lg:inline-block
    border-[#ffffff] 
    bg-gradient-to-b from-[#45cd3d] 
    via-[#171717]
     to-[#17cf5a] 
     hidden 
     bottom-0 
     top-0 
     m-3 
     rounded-3xl 
     overflow-hidden"
    >
      <div
        className="flex flex-col 
      gap-y-5
       w-full 
       h-full 
       p-3 
       bg-[#0e0e0e] 
       bg-opacity-90 
       bg-clip-padding 
       backdrop-filter 
       backdrop--blur__safari 
       backdrop-blur-3xl"
      >
        <div className="flex gap-x-2 items-center p-5 justify-center">
          <LogoSmall />
        </div>
        <div className="flex flex-col py-3">
          <Items
            page={page}
            slug={slug}
          />
        </div>
        <div className="px-16">
          <Separator
            orientation="horizontal"
            className="bg-[#333336]"
          />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Me</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  )
}

export default Sidebar