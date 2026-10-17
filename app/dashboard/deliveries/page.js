
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/session";
import { orders } from "../../lib/orders";

export default async function DeliveriesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/dashboard/deliveries");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  const deliveryOrders = orders.filter((order) =>
    ["confirmed", "preparing", "on-the-way"].includes(order.status)
  );

  const activeDeliveries = deliveryOrders.filter(
    (order) => order.status === "on-the-way"
  );

  const preparingOrders = deliveryOrders.filter(
    (order) => order.status === "preparing"
  );

  const confirmedOrders = deliveryOrders.filter(
    (order) => order.status === "confirmed"
  );

  return (
    <div className="adminPage">
      <div className="adminPageHeader">
        <div>
          <h1>Deliveries</h1>
          <p>Monitor orders being prepared and delivered to customers.</p>
        </div>
      </div>

      <div className="adminStatsGrid">
        <div className="adminStatCard">
          <span>Active Deliveries</span>
          <strong>{activeDeliveries.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Preparing Orders</span>
          <strong>{preparingOrders.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Confirmed Orders</span>
          <strong>{confirmedOrders.length}</strong>
        </div>
      </div>

      <section className="adminTableCard">
        <div className="adminTableHeader">
          <h2>Orders in Progress</h2>
          <span>{deliveryOrders.length} orders</span>
        </div>

        {deliveryOrders.length === 0 ? (
          <p className="adminEmptyState">
            No orders are currently in progress.
          </p>
        ) : (
          <div className="adminTableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Neighbourhood</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {deliveryOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName || "Customer"}</td>
                    <td>{order.area || "Not specified"}</td>
                    <td>
                      ETB {Number(order.total || 0).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`adminStatus adminStatus-${order.status}`}
                      >
                        {order.status.replaceAll("-", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="adminReportNote">
        Delivery management currently displays existing order data. Driver
        assignment and delivery updates are not implemented yet.
      </p>
    </div>
  );
}
