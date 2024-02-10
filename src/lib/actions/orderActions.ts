'use server'

import { CheckoutOrderParams } from "@/types"
import Order from "../models/Order"
import { connectToDB } from "../database"

import { handleError } from "../utils"

import { redirect } from "next/navigation"

export const createOrder = async (order:CheckoutOrderParams) => {
  
   try {
      await connectToDB();
      
      const newOrder = await Order.create({
        ...order,
        event: order.eventId,
        buyer: order.buyerId,
      });
      console.log(newOrder)
     
    } catch (error) {
      handleError(error);
    }
   
    redirect('/profile')
}