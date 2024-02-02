import {
  getAllEvents,
  getEventsByUser,
  getRelatedEventsByCategory,
} from "@/lib/actions/eventActions";
import { IEvents } from "@/lib/models/Event";
import React from "react";
import Card from "./Card";

type CollectionParamsTypes = {
  emptyStateSubText: string;
  emptyTitle: string;
  limit: number;
  page: number | string;
  totalPage?: number;
  collectionType:
    | "All_Events"
    | "Events_Organized"
    | "My_Tickets"
    | "Related_Events";
  urlParamName?: string;
  categoryId?: string;
  eventId?: string;
  userId?: string;
};

const Collection = async ({
  emptyStateSubText,
  emptyTitle,
  page,
  totalPage = 0,
  collectionType,
  urlParamName,
  categoryId,
  eventId,
  userId,
}: CollectionParamsTypes) => {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  const geteventbyCategory = await getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit: 6,
    page,
  });

  const geteventbyUser = await getEventsByUser({ userId, page: 1 });
  console.log(geteventbyUser?.data);
  const data =
    collectionType === "All_Events"
      ? events?.data
      : collectionType === "Related_Events"
      ? geteventbyCategory?.data
      : collectionType === "Events_Organized"
      ? geteventbyUser?.data
      : events?.data;

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-5">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 w-full lg:grid-cols-4  xl:gap-10">
            {data.map((item: any) => {
              const hidePrice = collectionType === "My_Tickets";
              const hasOrderLink = collectionType === "Events_Organized";

              return (
                <li key={item._id} className="flex-center">
                  <Card
                    event={item}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper rounded-[14px] w-full min-h-full gap-3 flex-col bg-gray-200 py-28">
          <h2>{emptyTitle}</h2>
          <h3>{emptyStateSubText}</h3>
        </div>
      )}
    </>
  );
};

export default Collection;
