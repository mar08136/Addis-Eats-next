export default function DishSkeleton() {
  return (
    <article className="dish-card skeleton-card">
      <div className="skeleton-image"></div>

      <div className="dish-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line small"></div>
      </div>
    </article>
  );
}