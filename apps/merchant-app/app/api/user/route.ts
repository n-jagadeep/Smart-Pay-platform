import { NextResponse } from "next/server";

export const GET = async () => {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      message: "hi there",
    });
  }

  const { default: db } = await import("@repo/db/client");
  await db.user.create({
    data: {
      email: "asd",
      name: "adsads",
      number: "0000000000",
      password: "placeholder",
    },
  });

  return NextResponse.json({
    message: "hi there",
  });
};

