'use client'


import { Menu } from 'lucide-react'
import React from 'react'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import { LogoSmall } from '@/svg/logo-small'
import { usePaths } from '@/hooks/use-nav'
import { PAGE_BREAD_CRUMBS } from '@/constant/page'
import Sheet from '../sheet'
import Search from './search'
import { Notifications } from './notification'
import MainBreadCrumb from '../bread-crumb/main-bread-crumb'
import CreateAutomation from '../create-automation'

type Props = {
  slug: string
}

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths()
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet
              trigger={<Menu />}
              className="lg:hidden"
              side="left"
            >
              <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
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
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb
          page={page === slug ? 'Home' : page}
          slug={slug}
        />
      </div>
    )
  )
}

export default InfoBar
