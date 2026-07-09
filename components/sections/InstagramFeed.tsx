// components/InstagramFeed.tsx

"use client";

import { useEffect, useState } from "react";

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

export default function InstagramFeed({
  username,
  limit = 6,
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getInstagramPosts() {
      try {
        const response = await fetch(`/api/instagram?limit=${limit}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "No se pudieron cargar las publicaciones.",
          );
        }

        setPosts(data.posts ?? []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las publicaciones.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    getInstagramPosts();
  }, [limit]);

  return (
    <section className="instagram-feed" aria-labelledby="instagram-feed-title">
      <div className="instagram-feed__header">
        <div>
          <span className="instagram-feed__eyebrow">Seguinos en Instagram</span>
        </div>

        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noreferrer"
          className="instagram-feed__link"
          aria-label={`Ver perfil de Instagram de ${username}`}
        >
          @{username}
        </a>
      </div>

      {isLoading && (
        <div
          className="instagram-feed__grid"
          aria-label="Cargando publicaciones"
        >
          {Array.from({ length: limit }).map((_, index) => (
            <div className="instagram-feed__skeleton" key={index} />
          ))}
        </div>
      )}

      {!isLoading && error && <p className="instagram-feed__error">{error}</p>}

      {!isLoading && !error && (
        <div className="instagram-feed__grid">
          {posts.map((post) => (
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="instagram-feed__card"
              key={post.id}
              aria-label="Abrir publicación en Instagram"
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={
                    post.caption
                      ? post.caption.slice(0, 120)
                      : "Publicación de Instagram"
                  }
                  className="instagram-feed__image"
                  loading="lazy"
                />
              ) : (
                <div className="instagram-feed__placeholder">
                  Ver publicación
                </div>
              )}

              <div className="instagram-feed__overlay">
                <span className="instagram-feed__badge">
                  {post.mediaType === "VIDEO"
                    ? "Video"
                    : post.mediaType === "CAROUSEL_ALBUM"
                      ? "Carrusel"
                      : "Post"}
                </span>

                {post.caption && (
                  <p className="instagram-feed__caption">
                    {post.caption.length > 90
                      ? `${post.caption.slice(0, 90)}...`
                      : post.caption}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
