// components/InstagramFeed.tsx

"use client";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl?: string;
  permalink: string;
  timestamp: string;
};

type InstagramFeedProps = {
  username: string;
  limit?: number;
  title?: string;
  description?: string;
};

function trackInstagramProfileClick(username: string) {
  sendGAEvent("event", "click_instagram_profile", {
    social_network: "instagram",
    instagram_username: username,
    link_location: "instagram_feed_header",
    destination: "instagram_profile",
  });
}

function trackInstagramPostClick({
  post,
  position,
  username,
}: {
  post: InstagramPost;
  position: number;
  username: string;
}) {
  sendGAEvent("event", "click_instagram_post", {
    social_network: "instagram",
    instagram_username: username,
    post_id: post.id,
    post_position: position,
    media_type: post.mediaType.toLowerCase(),
    link_location: "instagram_feed_grid",
    destination: "instagram_post",
  });
}

function getPostLabel(mediaType: InstagramPost["mediaType"]) {
  switch (mediaType) {
    case "VIDEO":
      return "Video";

    case "CAROUSEL_ALBUM":
      return "Carrusel";

    default:
      return "Post";
  }
}

function getPostAlt(post: InstagramPost) {
  if (!post.caption) {
    return `${getPostLabel(post.mediaType)} de Instagram`;
  }

  return post.caption.slice(0, 120);
}

export default function InstagramFeed({
  username,
  limit = 6,
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const instagramProfileUrl = `https://www.instagram.com/${username}/`;

  useEffect(() => {
    const controller = new AbortController();

    async function getInstagramPosts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/instagram?limit=${limit}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "No se pudieron cargar las publicaciones.",
          );
        }

        setPosts(data.posts ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las publicaciones.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getInstagramPosts();

    return () => controller.abort();
  }, [limit]);

  return (
    <section className="instagram-feed" aria-labelledby="instagram-feed-title">
      <div className="instagram-feed__header">
        <div>
          <span className="instagram-feed__eyebrow" id="instagram-feed-title">
            Seguinos en Instagram
          </span>
        </div>

        <a
          href={instagramProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-feed__link"
          aria-label={`Ver perfil de Instagram de ${username}`}
          onClick={() => trackInstagramProfileClick(username)}
        >
          @{username}
        </a>
      </div>

      {isLoading && (
        <div
          className="instagram-feed__grid"
          aria-label="Cargando publicaciones"
          aria-busy="true"
        >
          {Array.from({ length: limit }).map((_, index) => (
            <div
              className="instagram-feed__skeleton"
              key={`instagram-skeleton-${index}`}
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="instagram-feed__error" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="instagram-feed__grid">
          {posts.map((post, index) => {
            const postLabel = getPostLabel(post.mediaType);
            const postPosition = index + 1;

            return (
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-feed__card"
                key={post.id}
                aria-label={`Abrir ${postLabel.toLowerCase()} ${postPosition} en Instagram`}
                onClick={() =>
                  trackInstagramPostClick({
                    post,
                    position: postPosition,
                    username,
                  })
                }
              >
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={getPostAlt(post)}
                    className="instagram-feed__image"
                    loading="lazy"
                  />
                ) : (
                  <div className="instagram-feed__placeholder">
                    Ver publicación
                  </div>
                )}

                <div className="instagram-feed__overlay">
                  <span className="instagram-feed__badge">{postLabel}</span>

                  {post.caption && (
                    <p className="instagram-feed__caption">
                      {post.caption.length > 90
                        ? `${post.caption.slice(0, 90)}...`
                        : post.caption}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
