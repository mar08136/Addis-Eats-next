"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { orders as initialOrders } from "../../lib/orders";

const formatETB = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const statuses = [
  "all",
  "confirmed",
  "preparing",
  "on-the-way",
  "delivered",
  "cancelled",
];

const statusLabels = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  "on-the-way": "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      const matchesSearch = [
        order.id,
        order.name,
        order.area,
        order.status,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus =
        status === "all" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <main className="adminPage">
      <div className="adminPageHeading">
        <div>
          <p className="adminEyebrow">WORKSPACE / ORDERS</p>
          <h1>Orders Management</h1>
          <p>Search, review, and track customer orders.</p>
        </div>

        <Link className="adminSecondaryButton" href="/dashboard">
          ← Overview
        </Link>
      </div>

      <section className="adminStatsGrid">
        <article className="adminStatCard">
          <span>Total orders</span>
          <strong>{initialOrders.length}</strong>
          <small>All recorded orders</small>
        </article>

        <article className="adminStatCard">
          <span>Confirmed</span>
          <strong>
            {initialOrders.filter((o) => o.status === "confirmed").length}
          </strong>
          <small>Awaiting preparation</small>
        </article>

        <article className="adminStatCard">
          <span>Preparing</span>
          <strong>
            {initialOrders.filter((o) => o.status === "preparing").length}
          </strong>
          <small>Being prepared</small>
        </article>

        <article className="adminStatCard adminStatAccent">
          <span>Delivered</span>
          <strong>
            {initialOrders.filter((o) => o.status === "delivered").length}
          </strong>
          <small>Completed orders</small>
        </article>
      </section>

      <section className="adminPanel">
        <div className="adminPanelHeading">
          <div>
            <h2>All orders</h2>
            <p>{filteredOrders.length} order(s) found</p>
          </div>
        </div>

        <div className="adminOrderTools">
          <input
            className="adminSearchInput"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order ID, customer, or area..."
            aria-label="Search orders"
          />

          <select
            className="adminFilterSelect"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter orders by status"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All statuses" : statusLabels[item]}
              </option>
            ))}
          </select>
        </div>

        <div className="adminTableWrapper">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Area</th>
                <th>Total</th>
                <th>Status</th>
                <th>Order date</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="adminOrderId">{order.id}</td>
                  <td>{order.name || order.customerName || "Customer"}</td>
                  <td>{order.area || "Not recorded"}</td>
                  <td>{formatETB(order.total)}</td>
                  <td>
                    <span
                      className={`adminStatusBadge adminStatus-${order.status}`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-ET")
                      : "Not recorded"}
                  </td>
                  <td>
                    <Link
                      className="adminTableLink"
                      href={`/orders/${order.id}`}
                    >
                      View order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="adminEmptyState">
              <span>⌕</span>
              <h3>No orders found</h3>
              <p>Try another search term or status filter.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
