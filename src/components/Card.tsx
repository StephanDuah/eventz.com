import { IEvents } from "@/lib/models/Event";
import React from "react";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";
type CardParamsType = {
  event: IEvents;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardParamsType) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isCreator = userId === event.Organizer?._id.toString();

  return (
    <div
      // href={`/events/${event._id}`}
      className="group relative flex min-h-[380px] w-full max-[400px] flex-col overflow-hidden rounded-lg bg-white  transition-all hover-shadow-lg md:min-h-[230px]"
    >
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageURL})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 min-h-[150px] max-h-[200px]"
      />
      {isCreator && !hidePrice && (
        <div className="absolute right-2.5 top-2.5 flex flex-col bg-white transition-all rounded-lg shadow-sm gap-4 p-3">
          <Link href={`${event._id}/update`}>
            <PencilSquareIcon className="h-5 w-5 hover:text-primary transition-colors duration-200" />
          </Link>
          <DeleteConfirmation eventId={event._id} /> 
        </div>
      )}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[200px]  flex-col gap-2 p-5"
      >
        <div className="flex gap-2">
          <span className="p-bold-12 text-bold rounded-xl bg-green-100 px-2 py-0.5 text-green-700">
            {event.isFree ? "FREE" : `GHC ${event.price}`}
          </span>
          
        </div>
        <p className="p-medium-18 md:medium-20 line-clamp-2  text-black">
          {event.title}
        </p>
        <p className="p-medium-14 text-gray-500">
          {formatDateTime(event.startDateTime).dateOnly}
        </p>
        <p className="text-sm text-grey-500">
          {event.location}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 ">
            {event.Organizer?.firstName} {event.Organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`orders?eventId=${event._id}`} className="">
              <p>Order Details</p>
              <ArrowRightIcon className="h-10 w-10" />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
