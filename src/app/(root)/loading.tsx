"use client";
import React from "react";

import { Circles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden items-center justify-center">
      <div className="flex flex-col space-y-3 items-center">
        <Circles height="30" width="30" color="purple" ariaLabel="loading" />
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
