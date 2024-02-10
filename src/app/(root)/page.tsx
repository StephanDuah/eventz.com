import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'

import hero from '../../../public/main-hero.png'
export default function Home() {
  return (
    <main className="bg-dotted-500">

      {/* hero section */}


      <section className='relative max-h-[70%] flex md:block flex-col justify-center'>
      //  <Image src={hero} sizes='100vw' priority alt='landing hero w-100 object-cover object-position-75%' />     
       <div className='absolute z-10 top-1/4 xl:px-32 p-24  md:pt-0  max-w-7xl mx-auto'>
         <div className='xl:max-w-2xl max-w-md flex flex-col gap-8 break-words'>
            <h3 className='-ml-1  text-5xl xl:text-7xl font-semibold'>Find the Event you want</h3>
            <p className='xl:text-lg text-md text-slate-700'>Write content that readers love. Get suggestions, paraphrase sections, and more. Be the first to gain access when we launch.</p>
            <div className='w-full'>
            <button className='px-16 py-4 bg-primary-500 text-white rounded-lg'>
               Explore
            </button>
            </div>
            
         </div>
       </div>
    </section>
      <section className="py-10">
        <Collection
          emptyTitle="No events found"
          emptyStateSubText="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPage={2}
        />
      </section>
    </main>
  );
}
