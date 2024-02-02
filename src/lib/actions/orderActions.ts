'use server '

import { CheckoutOrderParams } from "@/types"
import Order, { IOrderItem } from "../models/Order"
import { connectToDB } from "../database"

import { handleError } from "../utils"



export const createOrder = async (order:CheckoutOrderParams) => {
  
   try {
      await connectToDB();
      
      const newOrder = await Order.create({
        ...order,
        event: order.eventId,
        buyer: order.buyerId,
      });
  
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      handleError(error);
    }
}