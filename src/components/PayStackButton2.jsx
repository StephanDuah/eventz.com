"use client";

import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { createOrder } from "@/lib/actions/orderActions";
import { randomUUID } from "crypto";


const PayStackButton = ({ userId, data,  email,className, text }) => {
  const handlePaystackSuccessAction = async (reference) => {
  try{
    if(reference.status === 'success'){
      const order= {
        referenceId: reference.reference,
        totalAmount: data.price,
        buyerId: userId,
        createdAt: new Date(),
        eventId: data._id,
       
      }

      await createOrder(order)

 
  }
  }catch(e){
    console.log(e)
    
    }
  };
  const compontProps = {
    email,
    amount: data.price * 100,
    publicKey: "pk_test_477e0a6ba869e4ebdf925fd5c63aa2a049411faa",
    text,
    reference: new Date().getTime().toString() + (Math.floor(Math.random() * 1000000) + 1),
    currency: "GHS",  
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: () => alert("User cancelled Payment"),
  };


  return <PaystackButton   className={className} {...compontProps} />;
};

export default PayStackButton;
