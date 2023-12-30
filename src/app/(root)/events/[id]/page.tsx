import { getEventDetails } from "@/lib/actions/eventActions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/Collection";
const page = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventDetails(id);
  if (!event) {
    return <div>No event</div>;
  }

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center bg-primary-50   ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageURL}
            width={1000}
            height={1000}
            alt={event.title}
            className="h-full object-cover max-h-[400px] my-20"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex w-full flex-col p-5 md:p-10 gap-8">
              <div className="flex flex-col gap-6">
                <h2 className="h2-bold">{event.title}</h2>
                <div className="flex flex-col  gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3 items-center">
                    <p className="text-sm font-bold rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                      {event.isFree ? "FREE" : `GHC ${event.price}`}
                    </p>
                    <p className="text-sm rounded-full bg-gray-500/10 py-2 px-4 text-gray-700 font-semibold">
                      {event.category.name}
                    </p>
                  </div>
                  <p className="font-semibold p-4 text-gray-700">
                    by ~{" "}
                    <span className="text-primary-500">
                      {event.Organizer.firstName} {event.Organizer.lastName}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 bg-green-700 text-white rounded-full">
                  {event.isFree
                    ? "Get Ticket"
                    : `By Tickect GHC ${event.price}`}
                </button>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <CalendarDaysIcon color="orange" className="h-6 w-6" />
                  <div className="items-center flex-wrap flex text-sm gap-2">
                    <p>
                      {formatDateTime(event.startDateTime).dateOnly} -{" "}
                      {formatDateTime(event.startDateTime).timeOnly}
                    </p>
                    /{" "}
                    <p>
                      {formatDateTime(event.endDateTime).dateOnly} -{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>
                <div className="flex  gap-2 ">
                  <MapPinIcon color="orange" className="h-6 w-6" />
                  <p className="text-sm font-semibold">{event.location}</p>
                </div>

                <div className="my-8">
                  <h2 className="p-bold-20">What you will learn</h2>
                  <p className="leading-10">{event.description}</p>
                  <p className="p-regular-50 text-primary underline">
                    {event.url}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-5 ">
        <h3 className="text-2xl font-semibold text-left sm:text-center">
          Related Events
        </h3>
        <Collection
          totalPage={2}
          limit={6}
          page={1}
          collectionType="Related_Events"
          emptyTitle="No Events found"
          emptyStateSubText="come back later"
          categoryId={event.category._id}
          eventId={event._id}
        />
      </section>
    </>
  );
};

export default page;
