"use server";
import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../models/User";
import { Event } from "../models/Event";
import Category from "../models/Category";

const populateEvent = async (query: any) => {
  try {
    return query
      .populate({
        path: "category",
        model: Category,
        select: "_id name",
      })
      .populate({
        path: "Organizer",
        model: User,
        select: "_id firstName lastName",
      });
  } catch (e) {
    console.log(e);
  }
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDB();

    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      Organizer: organizer._id,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventDetails = async (id: string) => {
  try {
    await connectToDB();
    const event = await populateEvent(Event.findById(id));
    console.log(event);
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
  }
};
