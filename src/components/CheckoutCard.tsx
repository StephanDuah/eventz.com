'use client'
import { IEvents } from '@/lib/models/Event'
import React from 'react'
import Checkout from './Checkout'
import { useState } from 'react'
const CheckoutCard = ({event}:{event:IEvents}) => {
    const [price, setPrice] = useState(Number(event.price))
  return (
    <div className="flex flex-col gap-3 bg-white w-[450px] mx-auto lg:w-[500px] shadow-lg rounded-md p-5">
           
           <h1 className="p-bold-16">Ways to Go</h1>
              
            <label htmlFor="regular" onClick={() => setPrice(Number(event.price))} >
            <input id="regular" name="ticket" type="radio" className="peer sr-only" />
              <div className=" flex justify-between relative p-5  peer-checked:bg-purple-200  border border-gray-900/10 peer-checked:border-purple-900/30 peer-checked:border-2  rounded-md">
                <div>
                  <h2 className="p-bold-16 capitalize">regular ticket</h2>
                  <p className="text-xs text-gray-700">One time Purchase</p>
                </div>
                <p className="text-sm font-bold">GHC {event.price}</p>
              </div>
             </label>
   
           
           
            
              
            <label htmlFor="vip" className="cursor-pointer" onClick={() => setPrice(Number(event.price) * 2)} >
            <input id="vip" name="ticket" type="radio" className="peer sr-only" />
              <div className=" flex  justify-between peer-checked:bg-purple-200 relative p-5 border border-gray-900/10 rounded-md peer-checked:border-purple-900/30 peer-checked:border-2">
                <div className="absolute "></div>
                <div className="space-y-3">
                  <h2 className="p-bold-16 capitalize">VIP ticket</h2>
                  <div className="p-2 space-y-1">
                  <p className="text-xs font-semibold  text-gray-700">Refund available</p>
                  <p className="text-xs font-semibold text-gray-700">cocktail party</p>
                  <p className="text-xs font-semibold text-gray-700">Meet the artist</p>
                  </div>
                </div>
                <p className="text-sm font-bold">GHC {Number(event.price )* 2}</p>
              </div>
             </label>
   
           
             <Checkout event={event} />
          </div>
  )
}

export default CheckoutCard