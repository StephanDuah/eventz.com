"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

type EventFormTypes = {
  id: String;
  type: "Create" | "Update";
};

const initValues = eventDefaultValues;
const EventForm = ({ id, type }: EventFormTypes) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initValues,
  });

  const [files, setFiles] = useState<File[]>([]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <Dropdown value="dsadfa" handleChange={() => {}} />
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72"></FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
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
                  <div className="flex items-center  bg-grey-50 px-2 h-[54px] py-2 rounded-full">
                    <CurrencyDollarIcon className="h-6 text-grey-500" />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="input-field "
                    />

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
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

        <Button type="submit" size="lg" className="button col-span-2 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
