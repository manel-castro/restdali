import { NextResponse } from "next/server";

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function GET(request: Request) {
  console.log("GET request: ", request);

  return new Response("Hello nextjs");
  // return NextResponse.json({ revalidated: true, now: Date.now() });
}
