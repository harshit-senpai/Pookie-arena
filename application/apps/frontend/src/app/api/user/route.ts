import { getUser } from "@/lib/auth";
import { AuthUser } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = (await getUser()) as AuthUser;

    if (!auth) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user = await fetch("http://localhost:8080/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userId: auth.id }),
    });

    const currentUser = await user.json();

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log("[GET_CURRENT_USER]", error);
    return NextResponse.json(
      {
        error: "Internal server Error",
      },
      { status: 500 }
    );
  }
}
