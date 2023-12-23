import { getEventDetails } from "@/lib/actions/eventActions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { formatDateTime } from "@/lib/utils";
const page = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventDetails(id);
  if (!event) {
    return <div>No event</div>;
  }

  return (
    <section className="flex flex-col md:flex-row justify-center bg-primary-50   ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageURL}
          width={1000}
          alt={event.title}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex w-full flex-col p-5 md:p-10 gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col  gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `GHC ${event.price}`}
                  </p>
                  <p className="p-regular-20 rounded-full bg-gray-500/10 py-2 px-4 text-gray-700 font-semibold">
                    {event.category.name}
                  </p>
                </div>
              </div>
              <p className="font-semibold p-4 text-gray-700">
                Organized by ~ {event.Organizer.firstName}{" "}
                {event.Organizer.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
