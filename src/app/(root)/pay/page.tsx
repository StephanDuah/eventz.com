import PayStackButton from "@/components/PayStackButton";
import React from "react";

const page = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <PayStackButton className="py-2 px-4 bg-green-500 rounded-xl text-sm text-white" amount={4000} email="kwaku@gmail.com" text="kwaku"/>
    </div>
  );
};

export default page;
