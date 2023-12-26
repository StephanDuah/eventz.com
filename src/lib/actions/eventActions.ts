"use server";
import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../models/User";
import { Event } from "../models/Event";
import Category from "../models/Category";
import { revalidatePath } from "next/cache";

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

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDB();
    const condition = {};
    const event = await populateEvent(
      Event.find(condition).sort({ createdAt: "desc" }).skip(0).limit(limit)
    );

    const eventCount = await Event.countDocuments(condition);
    return {
      data: JSON.parse(JSON.stringify(event)),
      totalPages: Math.ceil(eventCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDB();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDB();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
