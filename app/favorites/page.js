
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("addisEatsFavorites") || "[]"
      );

      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }

    setLoaded(true);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter(
      (dish) => String(dish.id) !== String(id)
    );

    setFavorites(updated);
    localStorage.setItem("addisEatsFavorites", JSON.stringify(updated));
  }

  if (!loaded) {
    return (
      <main className="favorites-page">
        <p className="favorites-loading">Loading your favorites...</p>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <section className="favorites-heading">
        <span className="favorites-eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>
          Your Favorites <span className="favorites-title-heart">♥</span>
        </h1>
        <p>Your favorite meals, all in one delicious place.</p>
      </section>

      {favorites.length === 0 ? (
        <section className="favorites-empty">
          <div className="empty-heart">♡</div>
          <h2>No favorites yet</h2>
          <p>
            Browse our menu and tap the heart on any dish you love.
            It will appear here.
          </p>
          <Link href="/menu" className="favorites-browse">
            Explore the Menu
          </Link>
        </section>
      ) : (
        <>
          <div className="favorites-count">
            {favorites.length} {favorites.length === 1 ? "dish" : "dishes"} saved
          </div>

          <section className="favorites-grid">
            {favorites.map((dish, index) => {
              const name = dish.name || dish.title || "Delicious Dish";
              const image = dish.image || dish.imageUrl || dish.img;
              const price = dish.price;

              return (
                <article
                  className="favorite-card"
                  key={dish.id ?? `${name}-${index}`}
                >
                  <div className="favorite-image">
                    {image ? (
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 280px"
                      />
                    ) : (
                      <div className="favorite-no-image">🍽️</div>
                    )}

                    <button
                      type="button"
                      className="favorite-remove"
                      onClick={() => removeFavorite(dish.id)}
                      aria-label={`Remove ${name} from favorites`}
                      title="Remove from favorites"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="favorite-info">
                    <h2>{name}</h2>

                    {price !== undefined && price !== null && (
                      <p className="favorite-price">
                        {typeof price === "number"
                          ? `${price} ETB`
                          : price}
                      </p>
                    )}

                    <div className="favorite-card-actions">
                      <Link
                        href={
                          dish.id !== undefined && dish.id !== null
                            ? `/menu/${dish.id}`
                            : "/menu"
                        }
                        className="favorite-view"
                      >
                        View Dish
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
