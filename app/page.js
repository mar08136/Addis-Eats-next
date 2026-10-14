
import Link from "next/link";
import Image from "next/image";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "Addis Eats | Delicious Food Delivered",
  description:
    "Discover Ethiopian favorites, burgers, pasta, coffee, and more with Addis Eats.",
};

const categories = [
  { name: "Ethiopian", emoji: "🍲", color: "peach" },
  { name: "Burgers", emoji: "🍔", color: "yellow" },
  { name: "Chicken & Fish", emoji: "🍗", color: "green" },
  { name: "Breakfast", emoji: "🥞", color: "pink" },
  { name: "Drinks", emoji: "☕", color: "blue" },
  { name: "Sweets", emoji: "🍰", color: "purple" },
];

const dishes = [
  {
    name: "Traditional Injera",
    description: "A delicious taste of Ethiopia",
    price: 320,
    image: "/images/kitifo.webp",
    emoji: "🍲",
  },
  {
    name: "Beef Burger",
    description: "Juicy, cheesy, and satisfying",
    price: 280,
    image: "/images/burger1.png",
    emoji: "🍔",
  },
  {
    name: "Fresh Fish",
    description: "A flavorful favorite",
    price: 350,
    image: "/images/fish.jpeg",
    emoji: "🐟",
  },
  {
    name: "Sweet Treat",
    description: "Something sweet for your day",
    price: 180,
    image: "/images/cheese%20cake.jpeg",
    emoji: "🍰",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Addis Eats",
    description: "Food ordering in Addis Ababa, Ethiopia.",
    servesCuisine: ["Ethiopian", "Fast Food"],
    areaServed: "Addis Ababa",
  };

  return (
    <main
      className={`playful-home ${nunito.variable}`}
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header />

      <section className="playful-hero">
        <div className="hero-copy">
          <span className="hero-pill">🌟 GOOD FOOD. GOOD VIBES!</span>

          <h1>
            Delicious food.
            <br />
            <span>Delivered to you!</span>
          </h1>

          <p>
            Your favorite flavors, all in one place. Discover amazing Ethiopian
            dishes and comfort food delivered right to your door.
          </p>

          <div className="hero-buttons">
            <Link href="/menu" className="playful-primary">
              Explore the Menu <span>→</span>
            </Link>

            <Link href="/cart" className="playful-secondary">
              View My Cart
            </Link>
          </div>

          <div className="hero-benefits">
            <div>
              <span>🛵</span>
              <p>
                <strong>Fast delivery</strong>
                <small>Food to your door</small>
              </p>
            </div>

            <div>
              <span>❤️</span>
              <p>
                <strong>Made with love</strong>
                <small>Meals worth sharing</small>
              </p>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-sun" />

          <div className="hero-food-image">
            <Image
                src="/images/burger2.png"
                alt="Burger"
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 768px) 90vw, 45vw"
                className="hero-food-image hero-burger-image"
            />
          </div>

          <div className="hero-sticker">
            BIG FLAVOR
            <br />
            BIG SMILES!
          </div>

          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>

          <div className="hero-caption">
            Freshly made
            <br />
            just for you!
          </div>
        </div>
      </section>

      <section className="playful-section categories-section">
        <div className="playful-section-heading">
          <div>
            <span className="section-kicker">WHAT ARE YOU CRAVING?</span>
            <h2>
              Find your <span>favorite.</span>
            </h2>
          </div>

          <Link href="/menu" className="playful-view-all">
            View all →
          </Link>
        </div>

        <div className="playful-category-grid">
          {categories.map((category) => (
            <Link
              href="/menu"
              key={category.name}
              className={`playful-category ${category.color}`}
            >
              <span>{category.emoji}</span>
              <strong>{category.name}</strong>
              <small>Explore dishes →</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="playful-section picks-section">
        <div className="playful-section-heading">
          <div>
            <span className="section-kicker">HANDPICKED FOR YOU</span>
            <h2>
              Today&apos;s <span>top picks.</span>
            </h2>
          </div>

          <Link href="/menu" className="playful-view-all">
            Full menu →
          </Link>
        </div>

        <div className="playful-dish-grid">
          {dishes.map((dish) => (
            <article className="playful-dish-card" key={dish.name}>
              <Link
                href="/menu"
                className="dish-image"
                aria-label={`Explore ${dish.name}`}
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  className="dish-photo"
                />

                <span className="dish-heart" aria-hidden="true">
                  ♡
                </span>
              </Link>

              <div className="dish-info">
                <span className="dish-rating">
                  ★ <span>Popular choice</span>
                </span>

                <h3>{dish.name}</h3>
                <p>{dish.description}</p>

                <div className="dish-bottom">
                  <strong>ETB {dish.price}</strong>

                  <Link href="/menu" className="dish-order-button">
                    Order →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="playful-delivery-banner">
        <div>
          <span>THE GOOD STUFF IS JUST A CLICK AWAY</span>
          <h2>Hungry? We&apos;ve got you.</h2>
          <p>Your next favorite meal is waiting for you.</p>

          <Link href="/menu" className="banner-order-button">
            Order something delicious →
          </Link>
        </div>

        <div className="banner-illustration" aria-hidden="true">
          🛵
        </div>
      </section>

      <footer className="playful-footer">
        <Link href="/" className="playful-logo">
          <span className="logo-mark">✦</span>
          Addis <span>Eats</span>
        </Link>

        <p>Good food, right around Addis. ❤️</p>

        <Link href="/menu">Explore our menu →</Link>
      </footer>
    </main>
  );
}
