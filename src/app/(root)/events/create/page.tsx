import EventForm from "@/components/EventForm";
import React from "react";

import { auth } from "@clerk/nextjs";
const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10">
        <h3 className="text-2xl font-semibold text-center py-3 ">
          Create Events
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm id={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
