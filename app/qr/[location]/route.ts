import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    location: string;
  }>;
};

const validLocations = new Set([
  "barras_aguero",
  "barras_chaca",
  "barras_calle",
]);

export async function GET(request: Request, context: RouteContext) {
  const { location } = await context.params;

  if (!validLocations.has(location)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const destination = new URL("/", request.url);

  destination.searchParams.set("utm_source", "qr");
  destination.searchParams.set("utm_medium", "offline");
  destination.searchParams.set("utm_campaign", "barras_calistenia");
  destination.searchParams.set("utm_content", location);

  return NextResponse.redirect(destination);
}
