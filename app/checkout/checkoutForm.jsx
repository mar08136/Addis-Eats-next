"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";
import { useCart } from "../cart/CartContext";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { totalPrice } = useCart();

  return (
    <section className="checkoutCard">
      <h1 className="checkoutTitle">Checkout</h1>

      <p className="checkoutSubtitle">
        Enter your details to complete your order.
      </p>

      <p className="checkoutTotal">
        Total: <strong>{totalPrice} ETB</strong>
      </p>

      <form action={formAction} className="checkoutForm">
        <input type="hidden" name="total" value={totalPrice} />

        <label className="checkoutLabel">
          Full Name
          <input
            className="checkoutInput"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </label>

        <label className="checkoutLabel">
          Phone Number
          <input
            className="checkoutInput"
            name="phone"
            type="tel"
            placeholder="09XXXXXXXX"
            required
          />
        </label>

        <label className="checkoutLabel">
          Delivery Neighbourhood
          <select
            className="checkoutInput"
            name="area"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your delivery area
            </option>
            <option value="Bole">Bole</option>
            <option value="Piazza">Piazza</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Mexico">Mexico</option>
            <option value="Lideta">Lideta</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {state?.error && (
          <p className="checkoutError">{state.error}</p>
        )}

        {state?.message && (
          <p className="checkoutSuccess">{state.message}</p>
        )}

        <button className="checkoutButton" disabled={pending}>
          {pending ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}