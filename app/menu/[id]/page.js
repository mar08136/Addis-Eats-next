
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDish, getDishes } from "../../../lib/seo-dishes";

export const revalidate = 3600;

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description =
    `${dish.name} for ${dish.price} ETB. ${dish.description}`.slice(0, 160);

  return {
    title: dish.name,
    description,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description,
      type: "website",
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
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
      images: [`/menu/${dish.id}/opengraph-image`],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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

      <article>
        <Image
          src={dish.image}
          alt={dish.name}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 800px"
        />

        <h1>{dish.name}</h1>
        <p>{dish.description}</p>
        <p>
          <strong>{dish.price} ETB</strong>
        </p>
        <p>Category: {dish.category}</p>
      </article>
    </main>
  );
}