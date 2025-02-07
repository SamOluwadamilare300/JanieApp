import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

import { FacebookIcon } from "@/icons/facebook"
import { XIcon } from "@/icons/XIcon"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM' 
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  // {
  //   title: 'Connect Facebook',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
  //   icon: <FacebookIcon />,
  //   strategy: 'FACEBOOK',
    
  // },
  // {
  //   title: 'Connect Twitter',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
  //   icon: < XIcon />,
  //   strategy: 'TWITTER',
    
  // },
  {
    title: 'Connect Salesforce',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]
