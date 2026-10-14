import Image from "next/image";
import Link from "next/link";
import { createDishSlug } from "../../lib/seo-dishes";

export default function DishList({ dishes }) {
  return (
    <div className="dishes-grid">
      {dishes.map((dish) => (
        <article key={dish.id} className="dish-card">
          <Link
            href={`/menu/${createDishSlug(dish.name)}`}
            className="dish-link"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, 400px"
              className="dish-image"
            />

            <div className="dish-content">
              <div className="dish-top">
                <span className="dish-category">
                  {dish.category}
                </span>

                <span className="dish-rating">
                  ★ {dish.rating}
                </span>
              </div>

              <h3>{dish.name}</h3>

              <p>{dish.description}</p>

              <div className="dish-footer">
                <strong>{dish.price} ETB</strong>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}