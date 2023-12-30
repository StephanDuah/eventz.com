import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Profile = () => {
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

      {/* my Events collection */}
      <section className="bg-primary-50 py-5 md:py-10">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Events</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore Events</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Profile;
