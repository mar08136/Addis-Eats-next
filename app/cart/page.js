"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-card">
          <div className="cart-icon">🛒</div>

          <p className="cart-eyebrow">YOUR CART</p>

          <h1>Your cart is empty</h1>

          <p>
            You haven't added any dishes yet. Explore our menu and find
            something delicious.
          </p>

          <Link href="/menu" className="primary-button">
            Explore Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <p className="cart-eyebrow">YOUR ORDER</p>
          <h1>Your Cart</h1>
          <p>Review your dishes before checking out.</p>
        </div>

        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                sizes="120px"
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>{item.price} ETB each</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <strong>
                  {item.price * item.quantity} ETB
                </strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="cart-summary">
          <div>
            <span>Total</span>
            <strong>{totalPrice} ETB</strong>
          </div>

          <Link href="/checkout" className="primary-button">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}