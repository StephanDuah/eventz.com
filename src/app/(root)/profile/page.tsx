import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      {/* tickets */}
      <section className="bg-primary-50 py-5 md:py-10">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore Events</Link>
          </Button>
        </div>
      </section>
      {/* Tickets collection */}
      <Collection page={1} collectionType="My_Tickets" totalPage={10} limit={12} emptyTitle="No events found" emptyStateSubText="come back later" userId={userId} />

      {/* my Events collection */}
      <section className="bg-primary-50 py-5 md:py-10">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Events</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore Events</Link>
          </Button>
        </div>

        <Collection
          page={1}
          collectionType="Events_Organized"
          totalPage={10}
          limit={12}
          emptyTitle="No events found"
          emptyStateSubText="come back later"
          userId={userId}
        />
      </section>
    </>
  );
};

export default Profile;
