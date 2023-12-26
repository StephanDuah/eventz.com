import React from "react";
import { auth } from "@clerk/nextjs";
import { UpdateEventParams } from "@/types";
import { getEventDetails } from "@/lib/actions/eventActions";
import EventForm from "@/components/EventForm";
type UpdateEventProps = {
  params: {
    id: string;
  };
};
const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventDetails(id);

  return (
    <>
      <section className="bg-primary-50  bg-center bg-cover py-5 md:py-10">
        <h3 className="text-2xl font-semibold text-center py-3 ">
          Update Event {`(${event.title})`}
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" event={event} />
      </div>
    </>
  );
};

export default UpdateEvent;
