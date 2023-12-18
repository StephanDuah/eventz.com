import { connectToDB } from "@/lib/database";
import User from "@/lib/models/User";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";
const userdata = {
  firstName: "kwaku",
  lastName: "Duah",
  photo: "sdfdss",
  clerkId: "dfasdsa",
  email: "dfafafdags",
  username: "dfsafds",
};
export const GET = async () => {
  try {
    await connectToDB();
    const user = await User.create(userdata);
    return NextResponse.json({ name: "hi", user });
  } catch (error) {
    handleError(error);
  }
};
