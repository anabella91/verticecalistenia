// app/api/instagram/route.ts

import { NextResponse } from "next/server";

export const revalidate = 3600;

type InstagramChildMedia = {
  id?: string;
  media_type?: "IMAGE" | "VIDEO";
  media_url?: string;
  thumbnail_url?: string;
};

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data?: InstagramChildMedia[];
  };
};

type InstagramResponse = {
  data?: InstagramMedia[];
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawLimit = Number(searchParams.get("limit") ?? 6);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 12)
    : 6;

  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const graphVersion = process.env.META_GRAPH_VERSION ?? "v25.0";

  if (!userId || !accessToken) {
    return NextResponse.json(
      {
        error: "Faltan INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN.",
        hasUserId: Boolean(userId),
        hasAccessToken: Boolean(accessToken),
      },
      { status: 500 },
    );
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "children{id,media_type,media_url,thumbnail_url}",
  ].join(",");

  const url = new URL(
    `https://graph.instagram.com/${graphVersion}/${userId}/media`,
  );

  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    const payload = (await response.json()) as InstagramResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload.error?.message ??
            "No se pudieron obtener las publicaciones de Instagram.",
          details: payload.error,
        },
        { status: response.status },
      );
    }

    const posts =
      payload.data?.map((post) => {
        const firstChild = post.children?.data?.[0];

        const imageUrl =
          post.media_type === "VIDEO"
            ? post.thumbnail_url
            : (post.media_url ??
              firstChild?.thumbnail_url ??
              firstChild?.media_url);

        return {
          id: post.id,
          caption: post.caption ?? "",
          mediaType: post.media_type,
          imageUrl,
          permalink: post.permalink,
          timestamp: post.timestamp,
        };
      }) ?? [];

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Instagram API error:", error);

    return NextResponse.json(
      { error: "Error interno al conectar con Instagram." },
      { status: 500 },
    );
  }
}
