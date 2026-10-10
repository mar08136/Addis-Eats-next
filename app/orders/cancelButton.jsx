"use client";

import { useState } from "react";
import { cancelOrder } from "../actions";

export default function CancelButton({ orderId }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleCancel() {
    setPending(true);
    const result = await cancelOrder(orderId);
    setMessage(result.message || result.error);
    setPending(false);
  }

  return (
    <div>
      <button onClick={handleCancel} disabled={pending}>
        {pending ? "Cancelling..." : "Cancel Order"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}