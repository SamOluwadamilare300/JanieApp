import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FlutterWaveButton } from 'flutterwave-react-v3'
import { toast } from 'sonner'
import { onUserInfo } from '@/actions/user'

type Props = {}

const PaymentButton = (props: Props) => {
  const { isProcessing } = useSubscription()
  
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await onUserInfo()
      if (response.status === 200 && response.data) {
        setUserEmail(response.data.email) // assuming the response contains email
        setUserName(`${response.data.firstname} ${response.data.lastname}`) // assuming first and last name are available
      }
    }

    fetchUserData()
  }, [])

  // Flutterwave configuration inside component
  const fwConfig = {
    public_key: 'FLWPUBK_TEST-93bc3cf0fcae86e2b33e17aaecd82c72-X',
    tx_ref: String(Date.now()),  // Convert to string
    amount: 29000, // Convert from kobo to Naira
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userEmail, 
      name: userName,  
    },
    customizations: {
      title: 'Janie Automation',
      description: 'Payment for Upgrade',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
    text: 'Payment with Flutterwave!',
    callback: (response: any) => {
      console.log(response)
      closePaymentModal()  // Close the payment modal after completion

      // Handle successful payment logic
      toast.success('Your payment was completed successfully.')
    },
    onClose: () => {
      toast.error('You canceled the payment process.')
    }
  }

  return (
    <Button>
      {/* Flutterwave payment button */}
      <FlutterWaveButton
        {...fwConfig}
        disabled={isProcessing || !userEmail || !userName} // Disable button if email or name is missing
        className="bg-gradient-to-br text-white rounded-full from-[#6d60a3] via-[#9434E6] font-bold to-[#CC3BD4]"
      >
        {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
      </FlutterWaveButton>
    </Button>
  )
}

export default PaymentButton
