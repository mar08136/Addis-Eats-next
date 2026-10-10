import { redirect } from "next/navigation";
import { orders } from "../lib/orders";
import CancelButton from "./cancelButton";
import { getSession } from "../../lib/session";
import SignOutButton from "../signin/SignOutButton";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const userOrders = orders.filter(
    (order) => order.userId === session.id
  );

  return (
    <main className="ordersPage">
      <div className="ordersContainer">
        <div className="ordersTopBar">
          <div>
            <h1 className="ordersTitle">My Orders</h1>
            <p className="ordersSubtitle">
              Track and manage your orders.
            </p>
          </div>

          <SignOutButton />
        </div>

        <div className="ordersList">
          {userOrders.map((order) => (
            <div className="orderCard" key={order.id}>
              <div className="orderHeader">
                <h2>Order #{order.id}</h2>

                <span
                  className={`orderStatus ${
                    order.status === "cancelled"
                      ? "cancelled"
                      : "confirmed"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="orderTotal">{order.total} ETB</p>

              {order.status !== "cancelled" && (
                <CancelButton orderId={order.id} />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}