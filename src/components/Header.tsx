"use client";
import Link from "next/link";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import {
  AcademicCapIcon,
  UsersIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { SignedOut } from "@clerk/nextjs";

const eventsSubNavigations = [
  {
    name: "Conferences",
    icon: VideoCameraIcon,
    description: "Explore industry conferences and seminars.",
  },
  {
    name: "Workshops",
    icon: AcademicCapIcon,
    description: "Participate in hands-on learning experiences.",
  },
  {
    name: "Meetups",
    icon: UsersIcon,
    description: "Connect with like-minded individuals at local meetups.",
  },
  {
    name: "Webinars",
    icon: ComputerDesktopIcon,
    description: "Attend online webinars and virtual events.",
  },
  {
    name: "Exhibitions",
    icon: CircleStackIcon,
    description: "Discover the latest innovations at exhibitions.",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-[#ad5389] to-[#3c1053] text-white ">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Eventbrite</span>
            <h3 className="text-md font-semibold">Eventz.com</h3>
          </Link>
        </div>
        <div className="flex lg:hidden text-white">
          <button
            className="-m-2.5 p-2.5 inline-flex items-center justify-center rounded-md"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white focus:outline-none">
              Events
              <ChevronDownIcon
                className="h-5 w-5 flex-none"
                aria-hidden={true}
              />
            </Popover.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute -left-8 top-full shadow-lg w-screen max-w-md overflow-hidden rounded-3xl ring-1 ring-[#ad5389]/5 bg-white">
                <div className="p-4">
                  {eventsSubNavigations.map((item) => (
                    <div
                      key={item.name}
                      className="group flex relative items-center gap-x-6 rounded-xl p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                    >
                      <item.icon className="h-6 w-6 text-[#3c1053] group-hover:text-[#3c1053]" />
                      <div className="flex-auto">
                        <a
                          href={item.name}
                          className="text-[#3c1053] text-sm font-semibold"
                        >
                          {item.name}
                        </a>

                        <p className="text-[#3c1053] text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <a href="#" className="font-semibold text-sm leading-6">
            Speakers
          </a>
          <a href="#" className="font-semibold text-sm leading-6">
            Location
          </a>
          <a href="#" className="font-semibold text-sm leading-6">
            Create Events
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedOut>
            <Link href="/sign-in" className="font-semibold text-sm leading-6">
              Log In
            </Link>
          </SignedOut>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <Dialog className="lg:hidden" open={open} onClose={setOpen}>
        <div className="fixed inset-0 z-10">
          <Dialog.Panel className="fixed bg-gradient-to-r from-[#ad5389] to-[#3c1053] inset-y-0 right-0 overflow-y-0 px-6 w-full py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/5">
            <div className="flex items-center justify-between">
              <a href="" className="text-white font-semibold">
                Eventz.com
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/50">
                <div className="space-y-2 py-6">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full -mx-3 flex items-center justify-between pl-3 pr-3.5 py-2 text-base text-white font-semibold rounded-xl  hover:bg-[#3c1053]/50 ${
                            open ? "bg-[#3c1053]/50" : ""
                          }`}
                        >
                          Events
                          <ChevronDownIcon
                            className={`${
                              open ? "rotate-180" : ""
                            } flex-none h-6 w-6 transition-transform duration-200`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...eventsSubNavigations].map((items) => (
                            <Disclosure.Button
                              key={items.name}
                              as="a"
                              href="#"
                              className="block pl-6 py-2 pr-3 text-sm text-white font-semibold leading-7 rounded-xl hover:bg-[#3c1053]/50"
                            >
                              {items.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="font-semibold text-base text-white leading-6  px-3 py-2 -mx-3 block   rounded-xl  hover:bg-[#3c1053]/50"
                  >
                    Speakers
                  </a>
                  <a
                    href="#"
                    className="font-semibold text-base text-white leading-6  px-3 py-2 -mx-3 block   rounded-xl  hover:bg-[#3c1053]/50"
                  >
                    Location
                  </a>
                  <a
                    href="#"
                    className="font-semibold text-base text-white leading-6  px-3 py-2 -mx-3 block   rounded-xl  hover:bg-[#3c1053]/50"
                  >
                    Create Events
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
