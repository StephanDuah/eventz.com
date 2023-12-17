import { connectToDB } from "@/lib/database";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const user = await User.find({});
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
};
