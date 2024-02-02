// "use client";
// import { createOrder } from "@/lib/actions/orderActions";
// import { IEvents } from "@/lib/models/Event";
// import { IOrderItem } from "@/lib/models/Order";
// import { randomUUID } from "crypto";
// import { redirect } from "next/navigation";
// import React, { useState } from "react";
// import { PaystackButton } from "react-paystack";



// type ButtonProps = {
//   email: string,
  
//   className: string,
//   text: string,
//   userId:string,
//   data: IEvents,
// };

// type RefrenceProps = {
//   status: string,
//   reference: string,
//   message: string,
// }


// // refrenceId: { type: String, required: true, unique:true },
// // createdAt: { type: Date, default: Date.now },
// // totalAmount :{type:Number,required:true},
// // event: { type: Schema.Types.ObjectId, ref: "Event" },
// // buyer: { type: Schema.Types.ObjectId, ref: "User" },


// const PayStackButton = ({ userId, data,  email,className, text }: ButtonProps) => {
  

//   const handlePaystackSuccessAction = async (reference: RefrenceProps) => {
//     if(reference.status === 'success'){
//       const order= {
//         referenceId: reference.reference,
//         totalAmount: data.price,
//         buyerId: userId,
//         createdAt: new Date(),
//         eventId: data._id,
       
//       }
     
//       await createOrder(order) 

      


//     }
//   };
//   const compontProps = {
//     email,
//     amount: data.price * 100,
//     publicKey: "pk_test_477e0a6ba869e4ebdf925fd5c63aa2a049411faa",
//     text,
//     reference: new Date().getTime().toString() + (Math.floor(Math.random() * 1000000) + 1),
//     currency: "GHS",
    
    
//     onSuccess: (reference: RefrenceProps) => handlePaystackSuccessAction(reference),
//     onClose: () => alert("User cancelled Payment"),
//   };


//   return <PaystackButton   className={className} {...compontProps} />;
// };

// export default PayStackButton;
