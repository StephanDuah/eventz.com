import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="bg-dotted-500">
      <section className="bg-gradient-to-r from-[#ad5389] to-[#3c1053] text-white ">
        <div className="wrapper -mx-2.4 -my-2.4 p-4 space-y-2">
          <h2 className="text-3xl font-semibold  lg:text-5xl">
            Grab your ticket to that moment
          </h2>
          <h2 className="text-lg">
            Eventz.com host +120000 events accross the world
          </h2>
        </div>
      </section>
    </main>
  );
}
