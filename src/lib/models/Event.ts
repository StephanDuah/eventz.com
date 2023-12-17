import mongoose, { model, models } from "mongoose";
import { Schema, Document, Types } from "mongoose";

export interface IEvents extends Document {
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageURL: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree?: boolean;
  url?: string;
  category?: { _id: String; name: String };
  Organizer?: { _id: String; username: String; photo: String };
}
const eventSchema = new Schema<IEvents>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    default: Date.now,
  },
  endDateTime: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
  },
  isFree: {
    type: Boolean,
  },
  url: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  Organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Event = models.Event || model("event", eventSchema);
