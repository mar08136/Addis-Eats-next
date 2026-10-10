
import Link from "next/link";

export const metadata = {
  title: "Addis Eats | Fast Food & More",
  description:
    "Discover burgers, pizza, crispy chicken, fries and your favorite meals with Addis Eats.",
};

const categories = [
  { name: "Burgers", icon: "🍔", color: "#f1dfce" },
  { name: "Pizza", icon: "🍕", color: "#f5e7c8" },
  { name: "Chicken", icon: "🍗", color: "#eddbcc" },
  { name: "Fries & Sides", icon: "🍟", color: "#f5e9bd" },
  { name: "Desserts", icon: "🍰", color: "#f1dce0" },
  { name: "Drinks", icon: "🥤", color: "#dce7e8" },
];

const popularDishes = [
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef, melted cheese, fresh lettuce",
    price: "From 250 ETB",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
    tag: "BESTSELLER",
  },
  {
    name: "Loaded Pepperoni Pizza",
    description: "Golden crust, rich sauce, extra cheese",
    price: "From 350 ETB",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=85",
    tag: "FAN FAVORITE",
  },
  {
    name: "Crispy Fried Chicken",
    description: "Crunchy coating, tender and flavorful",
    price: "From 280 ETB",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=85",
    tag: "MUST TRY",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f1ed] text-[#25211f]">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-2 lg:px-16">
        <div className="relative z-10">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-[#9e5b24]">
            <span className="h-px w-8 bg-[#9e5b24]" />
            GOOD FOOD. GOOD MOOD.
          </p>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Your cravings.
            <span className="mt-2 block text-[#9e5b24]">
              Our kitchen.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#6b605a] sm:text-lg">
            From juicy burgers and crispy fries to pizza worth sharing,
            find your next favorite bite with Addis Eats.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-xl bg-[#9e5b24] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#9e5b24]/20 transition hover:-translate-y-1 hover:bg-[#884b1a]"
            >
              Explore Menu <span className="ml-2">→</span>
            </Link>

            <Link
              href="/cart"
              className="rounded-xl border border-[#d9c9bd] bg-[#fffaf7] px-7 py-4 text-sm font-bold transition hover:border-[#9e5b24]"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#e4d6cc] pt-7">
            <div>
              <p className="text-lg font-black">Fresh</p>
              <p className="mt-1 text-xs text-[#6b605a]">Made for your cravings</p>
            </div>
            <div>
              <p className="text-lg font-black">Local</p>
              <p className="mt-1 text-xs text-[#6b605a]">Proudly serving Addis</p>
            </div>
            <div>
              <p className="text-lg font-black">Easy</p>
              <p className="mt-1 text-xs text-[#6b605a]">Simple online ordering</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-8 top-8 h-64 w-64 rounded-full bg-[#e7c5a5]/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-[#23180c] p-3 shadow-2xl shadow-[#392719]/15">
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1100&q=90"
              alt="Delicious burger with golden fries"
              className="h-[360px] w-full rounded-[1.5rem] object-cover sm:h-[460px]"
            />

            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-2xl border border-white/20 bg-[#23180c]/85 p-4 text-white backdrop-blur-md sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="text-xs font-medium text-[#e8b486]">
                  YOUR NEXT FAVORITE
                </p>
                <p className="mt-1 text-lg font-bold">One bite. Big mood.</p>
              </div>
              <Link
                href="/menu"
                aria-label="Explore the menu"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9e5b24] text-xl transition hover:bg-[#b86c30]"
              >
                →
              </Link>
            </div>
          </div>

          <div className="absolute -left-5 top-8 rounded-xl bg-[#fffaf7] px-4 py-3 shadow-xl sm:-left-8">
            <p className="text-sm font-black">Made to crave.</p>
            <p className="mt-1 text-xs text-[#6b605a]">Every bite counts.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#9e5b24]">
              FIND YOUR FAVORITE
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              What are you craving?
            </h2>
          </div>

          <Link
            href="/menu"
            className="text-sm font-bold text-[#884b1a] transition hover:underline"
          >
            See full menu →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/menu"
              className="group rounded-2xl border border-[#eadfd6] bg-[#fffaf7] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c9946d] hover:shadow-lg hover:shadow-[#392719]/5"
            >
              <div
                style={{ backgroundColor: category.color }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-105"
              >
                {category.icon}
              </div>
              <p className="mt-4 text-sm font-bold">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#9e5b24]">
              THE CROWD LOVES THESE
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Popular right now.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#6b605a]">
              A few delicious reasons to skip cooking today.
            </p>
          </div>

          <Link
            href="/menu"
            className="rounded-lg border border-[#d9c9bd] px-5 py-3 text-sm font-bold transition hover:border-[#9e5b24] hover:bg-[#fffaf7]"
          >
            Explore everything →
          </Link>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDishes.map((dish) => (
            <article
              key={dish.name}
              className="group overflow-hidden rounded-2xl border border-[#eadfd6] bg-[#fffaf7] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#392719]/10"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-md bg-[#23180c] px-3 py-2 text-[10px] font-bold tracking-widest text-white">
                  {dish.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black">{dish.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b605a]">
                  {dish.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eee3da] pt-4">
                  <p className="text-sm font-black text-[#884b1a]">
                    {dish.price}
                  </p>
                  <Link
                    href="/menu"
                    className="rounded-lg bg-[#9e5b24] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#884b1a]"
                  >
                    Order now +
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-16 overflow-hidden rounded-3xl bg-[#23180c] px-6 py-14 text-center text-white sm:mx-10 sm:py-20 lg:mx-16">
        <p className="text-xs font-bold tracking-[0.25em] text-[#e8b486]">
          YOUR NEXT BITE IS WAITING
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-5xl">
          Good food makes an ordinary day better.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#e5d9ce] sm:text-base">
          Find your favorites, discover something new, and let Addis Eats
          take care of the cravings.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex rounded-xl bg-[#9e5b24] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#b86c30]"
        >
          Find Your Next Favorite →
        </Link>
      </section>
    </main>
  );
}