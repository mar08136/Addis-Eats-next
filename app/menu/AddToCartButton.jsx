"use client";

import { useCart } from "../cart/CartContext";
import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      className="add-cart-button"
      onClick={handleAdd}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
