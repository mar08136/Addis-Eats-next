
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDish, getDishes, createDishSlug } from "../../../lib/seo-dishes";

export const revalidate = 3600;

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    slug: createDishSlug(dish.name),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dish = await getDish(slug);

  if (!dish) {
    return {
      title: "Dish Not Found",
      robots: { index: false, follow: true },
    };
  }

  const description =
    `${dish.name} for ${dish.price} ETB. ${dish.description}`.slice(0, 160);
  const imageUrl = `/menu/${createDishSlug(dish.name)}/opengraph-image`;

  return {
    title: dish.name,
    description,
    alternates: {
      canonical: `/menu/${createDishSlug(dish.name)}`,
    },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${dish.name} from Addis Eats`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dish.name} · Addis Eats`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DishPage({ params }) {
  const { slug } = await params;
  const dish = await getDish(slug);

  if (!dish) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://addis-eats-next-4wqn.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: new URL(dish.image, siteUrl).toString(),
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="dish-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="dish-detail-container">
        <a href="/menu" className="dish-back-link">
          <span>←</span> Back to menu
        </a>

        <article className="dish-detail-card">
          <div className="dish-detail-image">
            <Image
              src={dish.image}
              alt={dish.name}
              width={800}
              height={600}
              priority
              sizes="(max-width: 850px) 100vw, 50vw"
            />
            <span className="dish-image-badge">ADDIS EATS ORIGINAL</span>
          </div>

          <div className="dish-detail-info">
            <span className="dish-category-badge">{dish.category}</span>
            <p className="dish-eyebrow">MADE TO SATISFY</p>
            <h1 className="dish-detail-title">{dish.name}</h1>
            <p className="dish-detail-description">{dish.description}</p>

            <div className="dish-price-row">
              <span className="dish-price-label">Your price</span>
              <p className="dish-detail-price">
                {dish.price} <span>ETB</span>
              </p>
            </div>

            <div className="dish-detail-divider" />

            <div className="dish-delivery-note">
              <span className="dish-delivery-icon">✦</span>
              <div>
                <strong>A little happiness, delivered.</strong>
                <p>
                  Enjoy your favorite flavors with Addis Eats,
                  your food destination in Addis Ababa.
                </p>
              </div>
            </div>

            <a href="/menu" className="dish-browse-button">
              Explore the menu <span>→</span>
            </a>

            <p className="dish-detail-footer">
              GOOD FOOD. GOOD MOOD. ADDIS EATS.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
