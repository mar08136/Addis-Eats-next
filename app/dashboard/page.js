
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { orders } from "../lib/orders";
import RevenueChart from "./RevenueChart";
import OrderTable from "../orders/OrderTable";

const formatETB = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default async function DashboardPage({ searchParams }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/dashboard");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  const params = await searchParams;
  const requestedPage = Number(params?.page || 1);
  const sortOptions = ["id", "name", "area", "total", "status", "createdAt"];
  const sort = sortOptions.includes(params?.sort)
    ? params.sort
    : "createdAt";
  const direction = params?.direction === "asc" ? "asc" : "desc";

  const allOrders = orders;
  const activeOrders = allOrders.filter(
    (order) => order.status !== "cancelled"
  );

  const totalRevenue = activeOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const averageOrderValue = activeOrders.length
    ? totalRevenue / activeOrders.length
    : 0;

  const revenueByArea = activeOrders.reduce((summary, order) => {
    const area = order.area || "Not recorded";
    summary[area] = (summary[area] || 0) + Number(order.total || 0);
    return summary;
  }, {});

  const revenueData = Object.entries(revenueByArea).map(
    ([area, revenue]) => ({
      area,
      revenue,
    })
  );

  const ordersByDate = allOrders.reduce((summary, order) => {
    const date = order.createdAt
      ? new Date(order.createdAt).toISOString().slice(0, 10)
      : "Not recorded";

    summary[date] = (summary[date] || 0) + 1;
    return summary;
  }, {});

  const ordersData = Object.entries(ordersByDate)
    .map(([date, count]) => ({
      date,
      orders: count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main className="dashboardPage">
      <div className="dashboardContainer">
        <header className="dashboardHeader">
          <div>
            <p className="dashboardEyebrow">ADDIS EATS · ADMIN</p>
            <h1>Dashboard</h1>
            <p>Track revenue and orders across your delivery areas.</p>
          </div>
          <span className="dashboardLiveLabel">Order overview</span>
        </header>

        {allOrders.length === 0 ? (
          <section className="dashboardEmpty dashboardEmptyMain">
            <h2>No order data yet</h2>
            <p>
              Your analytics will appear here after the first order is placed.
            </p>
          </section>
        ) : (
          <>
            <section className="dashboardMetrics" aria-label="Order summaries">
              <article className="dashboardMetric">
                <span>Total revenue</span>
                <strong>{formatETB(totalRevenue)}</strong>
                <small>Excludes cancelled orders</small>
              </article>
              <article className="dashboardMetric">
                <span>All orders</span>
                <strong>{allOrders.length}</strong>
                <small>Including cancelled orders</small>
              </article>
              <article className="dashboardMetric">
                <span>Average order value</span>
                <strong>{formatETB(averageOrderValue)}</strong>
                <small>Based on non-cancelled orders</small>
              </article>
            </section>

            <RevenueChart
              revenueData={revenueData}
              ordersData={ordersData}
            />

            <OrderTable
              orders={allOrders}
              sort={sort}
              direction={direction}
              page={Number.isFinite(requestedPage) ? requestedPage : 1}
            />
          </>
        )}
      </div>
    </main>
  );
}
