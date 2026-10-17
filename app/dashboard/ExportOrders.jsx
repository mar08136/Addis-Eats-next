"use client";

import { downloadCsv } from "../../lib/csv";
import { etb, when } from "../../lib/format";

export default function ExportOrders({ orders }) {
  function handleExport() {
    const rows = orders.map((order) => ({
      "Order ID": order.id,
      Customer: order.name || "Customer",
      Neighbourhood: order.area || "Not recorded",
      Total: etb.format(Number(order.total || 0)),
      Status: order.status || "Unknown",
      "Order Date": order.createdAt
        ? when.format(new Date(order.createdAt))
        : "Not recorded",
    }));

    downloadCsv("addis-eats-orders.csv", rows);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={orders.length === 0}
      className="rounded-lg bg-[#9e5b24] px-4 py-2 font-medium text-white transition hover:bg-[#884b1a] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Export CSV
    </button>
  );
}