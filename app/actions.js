"use server";

import { revalidatePath } from "next/cache";
import { validateOrder } from "./lib/orderValidation";
import { orders } from "./lib/orders";
import { getSession } from "../lib/session";

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return { error: "You must sign in first" };
  }

  const name = formData.get("name");
  const phone = formData.get("phone");
  const total = Number(formData.get("total"));

  const error = validateOrder(name, phone);

  if (error) {
    return { error };
  }

  if (!total || total <= 0) {
    return { error: "Your cart is empty" };
  }

  const order = {
    id: `order-${Date.now()}`,
    userId: session.id,
    name,
    phone,
    total,
    status: "confirmed",
  };

  orders.push(order);

  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    message: "Order placed successfully",
    name,
    phone,
    total,
  };
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return { error: "You must sign in first" };
  }

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return { error: "Order not found" };
  }

  if (order.userId !== session.id) {
    return { error: "You cannot cancel another user's order" };
  }

  order.status = "cancelled";

  revalidatePath("/orders");

  return { message: "Order cancelled successfully" };
}