"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import { User } from "../models/User";
import { revalidatePath } from "next/cache";

export const CreateUser = async (user: CreateUserParams) => {
  try {
    await connectToDB();

    const newUser = await User.create();

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDB();
    const users = await User.findByIdAndUpdate({ clerkId }, user, {
      new: true,
    });
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    // await Promise.all([
    //   // Update the 'events' collection to remove references to the user
    // //   Event.updateMany(
    // //     { _id: { $in: userToDelete.events } },
    // //     { $pull: { organizer: userToDelete._id } }
    // //   ),

    //   // Update the 'orders' collection to remove references to the user
    // //   Order.updateMany(
    // //     { _id: { $in: userToDelete.orders } },
    // //     { $unset: { buyer: 1 } }
    // //   ),
    //  ]);

    // Delete user

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
