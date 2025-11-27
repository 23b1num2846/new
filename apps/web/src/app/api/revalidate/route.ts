import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { id } = await req.json();

  revalidateTag(`business-${id}`, "default");

  return NextResponse.json({ revalidated: true });
}
