type InstagramProfile = {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
};

type InstagramPost = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

const INSTAGRAM_USERNAME = "verticecalistenia";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

async function getInstagramProfile(): Promise<InstagramProfile | null> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return null;
  }

  const fields =
    "id,username,name,profile_picture_url,followers_count,media_count";

  const url = `https://graph.facebook.com/v25.0/${userId}?fields=${fields}&access_token=${accessToken}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return [];
  }

  const fields = "id,caption,media_url,thumbnail_url,permalink";

  const url = `https://graph.facebook.com/v25.0/${userId}/media?fields=${fields}&limit=6&access_token=${accessToken}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.data ?? [];
  } catch {
    return [];
  }
}

function formatNumber(value?: number) {
  if (!value) return null;

  return new Intl.NumberFormat("es-AR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default async function InstagramSection() {
  const [profile, posts] = await Promise.all([
    getInstagramProfile(),
    getInstagramPosts(),
  ]);

  const followers = formatNumber(profile?.followers_count);
  const mediaCount = formatNumber(profile?.media_count);

  const visiblePosts = posts
    .map((post) => ({
      ...post,
      previewSrc: post.thumbnail_url ?? post.media_url,
    }))
    .filter((post) => Boolean(post.previewSrc));

  return (
    <section className="instagram-section" id="comunidad">
      <div className="instagram-section__container">
        <div className="instagram-section__header">
          <div className="instagram-section__content">
            <span className="instagram-section__eyebrow">
              Comunidad Vértice
            </span>

            <h2 className="instagram-section__title">
              Entrenamientos, progresos y una comunidad que crece en cada clase
            </h2>

            <p className="instagram-section__description">
              Mirá cómo se vive el entrenamiento, los avances del grupo y el
              ambiente de las clases en Instagram.
            </p>
          </div>

          <a
            className="instagram-section__profile-card"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver Instagram de ${INSTAGRAM_USERNAME}`}
          >
            <div className="instagram-section__avatar">
              {profile?.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt={`Foto de perfil de ${profile.username}`}
                  className="instagram-section__avatar-image"
                />
              ) : (
                <span className="instagram-section__avatar-placeholder">V</span>
              )}
            </div>

            <div className="instagram-section__profile-info">
              <p className="instagram-section__username">
                @{profile?.username ?? INSTAGRAM_USERNAME}
              </p>

              <p className="instagram-section__profile-name">
                {profile?.name ?? "Vértice Calistenia"}
              </p>

              <div className="instagram-section__stats">
                {followers && <span>{followers} seguidores</span>}
                {mediaCount && <span>{mediaCount} publicaciones</span>}
              </div>
            </div>

            <span className="instagram-section__profile-action">
              Ver cuenta
            </span>
          </a>
        </div>

        <div className="instagram-section__posts">
          {visiblePosts.map((post) => (
            <a
              className="instagram-section__post"
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              key={post.id}
              aria-label="Ver publicación en Instagram"
            >
              <img
                src={post.previewSrc}
                alt={
                  post.caption ??
                  "Publicación de Instagram de Vértice Calistenia"
                }
                className="instagram-section__post-image"
                loading="lazy"
              />

              <div className="instagram-section__post-overlay">
                <span>Ver en Instagram</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
