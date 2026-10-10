import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./cart/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats | Food Delivery in Addis Ababa",
  },
  description:
    "Order Ethiopian favorites, burgers, pizza, sweets and drinks from the Addis Eats menu. Discover delicious food for delivery in Addis Ababa.",
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
    title: "Addis Eats | Food Delivery in Addis Ababa",
    description:
      "Discover Ethiopian favorites and everyday meals on the Addis Eats menu.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <header>
            <nav>
              <Link href="/">Addis Eats</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </header>

          {children}

          <footer>
            <p>© 2026 Addis Eats</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}