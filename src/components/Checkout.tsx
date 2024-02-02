'use client'
import { IEvents } from '@/lib/models/Event'
import React from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import PayStackButton from './PayStackButton'

const Checkout = ({event}:{event:IEvents}) => {

    const {user} = useUser()
    const hasFinished = new Date(event.endDateTime) > new Date
    const userId = user?.publicMetadata.userId as string

  return (
    <>
      {
        hasFinished ? 'Sorry Event has already passed': 
        <>
        <SignedOut>
          <Button asChild className='px-4 py-2 bg-green-700 text-white rounded-full'>
            <Link href={'/sign-in'}>Checkout</Link>
          </Button>
        </SignedOut>

        <SignedIn>
            <PayStackButton userId={userId} email='kwakuduah@gmail.com'  data={event} text='Checkout' className='px-4 py-2 bg-green-700 text-white rounded-full' />
        </SignedIn>
        </>
      }
    
    </>
  )
}

export default Checkout