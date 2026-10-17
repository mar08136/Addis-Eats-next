import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/session";
import { orders } from "../../lib/orders";

const formatETB = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default async function ReportsPage() {
  const session = await getSession();

  if (!session) redirect("/signin?next=/dashboard/reports");
  if (session.role !== "staff") redirect("/");

  const completedOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  const activeOrders = orders.filter(
    (order) => order.status !== "cancelled"
  );

  const revenue = completedOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const averageOrder = activeOrders.length
    ? activeOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      ) / activeOrders.length
    : 0;

  const statusCounts = orders.reduce((result, order) => {
    result[order.status] = (result[order.status] || 0) + 1;
    return result;
  }, {});

  const areaCounts = orders.reduce((result, order) => {
    const area = order.area || "Not recorded";
    result[area] = (result[area] || 0) + 1;
    return result;
  }, {});

  return (
    <main className="adminPage">
      <div className="adminPageHeading">
        <div>
          <p className="adminEyebrow">WORKSPACE / REPORTS</p>
          <h1>Reports & Analytics</h1>
          <p>Review order performance and recorded sales.</p>
        </div>

        <Link className="adminSecondaryButton" href="/dashboard">
          ← Overview
        </Link>
      </div>

      <section className="adminStatsGrid">
        <article className="adminStatCard adminStatAccent">
          <span>Delivered revenue</span>
          <strong>{formatETB(revenue)}</strong>
          <small>From delivered orders only</small>
        </article>

        <article className="adminStatCard">
          <span>Total orders</span>
          <strong>{orders.length}</strong>
          <small>Including cancelled orders</small>
        </article>

        <article className="adminStatCard">
          <span>Delivered orders</span>
          <strong>{completedOrders.length}</strong>
          <small>Completed deliveries</small>
        </article>

        <article className="adminStatCard">
          <span>Average order value</span>
          <strong>{formatETB(averageOrder)}</strong>
          <small>Excludes cancelled orders</small>
        </article>
      </section>

      <section className="adminPanel">
        <div className="adminPanelHeading">
          <div>
            <h2>Orders by status</h2>
            <p>Current status of recorded orders</p>
          </div>
        </div>

        <div className="adminReportList">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div className="adminReportRow" key={status}>
              <span className={`adminStatusBadge adminStatus-${status}`}>
                {status.replaceAll("-", " ")}
              </span>
              <div className="adminReportBar">
                <span
                  style={{
                    width: `${orders.length ? (count / orders.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <strong>{count}</strong>
            </div>
          ))}

          {orders.length === 0 && <p>No orders have been recorded yet.</p>}
        </div>
      </section>

      <section className="adminPanel">
        <div className="adminPanelHeading">
          <div>
            <h2>Orders by neighbourhood</h2>
            <p>Number of orders recorded in each area</p>
          </div>
        </div>

        <div className="adminReportList">
          {Object.entries(areaCounts).map(([area, count]) => (
            <div className="adminReportRow" key={area}>
              <span className="adminReportArea">{area}</span>
              <div className="adminReportBar">
                <span
                  style={{
                    width: `${orders.length ? (count / orders.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </section>

      <p className="adminReportNote">
        These reports use the orders currently available in your application.
        If order storage is in memory, the figures are not permanent historical
        records.
      </p>
    </main>
  );
}
