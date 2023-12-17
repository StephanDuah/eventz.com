import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = () => {
  try {
    const user = User.find({});
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
};
