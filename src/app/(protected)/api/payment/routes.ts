
import { currentUser } from '@clerk/nextjs/server';
import { useFlutterwave } from 'flutterwave-react-v3';
import { NextResponse } from 'next/server';
 const config = {
    public_key:console.log(process.env.FLUTTERWAVE_PUBLIC_KEY as string),
    tx_ref: Date.now(),
    amount: 29000,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };


// useFlutterwave(config)

export async function GET(){
  const user = await currentUser()
  if(!user) return NextResponse.json({status: 404})
}

export default useFlutterwave