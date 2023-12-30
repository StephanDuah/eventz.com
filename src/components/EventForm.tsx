"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormSchema } from "@/lib/Validator";
import { eventDefaultValues } from "@/lib/Constants";
import Dropdown from "./Dropdown";
import { Textarea } from "./ui/textarea";
import { FileUploader } from "./FileUploader";
import {
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "./ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { createEvent } from "@/lib/actions/eventActions";
import { useRouter } from "next/navigation";
import { IEvents } from "@/lib/models/Event";
import { updateEvent } from "@/lib/actions/eventActions";

type EventFormTypes = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvents;
};

const EventForm = ({ userId, type, event }: EventFormTypes) => {
  const initValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initValues,
  });

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    var uploadedImageUrl = values.imageURL;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      console.log(uploadedImages);
      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageURL: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();

          router.push(`/events/${newEvent._id}`);
        }

        return JSON.parse(JSON.stringify(newEvent));
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }

    if (type === "Update") {
      try {
        if (!event?._id) {
          return router.back();
        }
        const newEvent = await updateEvent({
          event: { ...values, imageURL: uploadedImageUrl, _id: event._id },
          userId,

          path: `/events/${event._id}`,
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }

        return JSON.parse(JSON.stringify(newEvent));
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown value={field.value} handleChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    className="textarea rounded-2xl"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72"></FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
                <div>{field.value}</div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full">
                    <MapPinIcon className="h-6 text-grey-500" />
                    <Input
                      placeholder="Event Location"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full">
                    <CalendarDaysIcon className="h-6 text-grey-500" />
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      placeholderText="Start Date"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full">
                    <CalendarDaysIcon className="h-6 text-grey-500" />
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      placeholderText="End Date"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full justify-between">
                    <CurrencyDollarIcon className=" text-grey-500 h-10" />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="input-field"
                    />

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500 "
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full">
                    <MapPinIcon className="h-6 text-grey-500" />
                    <Input
                      placeholder="Url"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
