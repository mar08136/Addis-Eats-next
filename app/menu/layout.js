export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Categories</h2>
        <nav>
          <a href="/menu">All Dishes</a>
          <a href="/menu?category=fast-food">Fast Food</a>
          <a href="/menu?category=chicken-fish">Chicken & Fish</a>
          <a href="/menu?category=sweets">Sweets</a>
          <a href="/menu?category=breakfast">Breakfast</a>
          <a href="/menu?category=drinks">Drinks</a>
          <a href="/menu?category=traditional-food">Traditional Food</a>
        </nav>
      </aside>

      <section className="menu-content">{children}</section>
    </div>
  );
}