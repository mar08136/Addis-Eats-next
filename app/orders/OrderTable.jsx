
import Link from "next/link";
import ExportOrders from "../dashboard/ExportOrders";
import { etb, when } from "../../lib/format";

const PAGE_SIZE = 5;

const columns = [
  { key: "id", label: "Order ID" },
  { key: "name", label: "Customer" },
  { key: "area", label: "Neighbourhood" },
  { key: "total", label: "Total" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Order Date" },
];

export default function OrderTable({
  orders = [],
  sort = "createdAt",
  direction = "desc",
  page = 1,
}) {
  const validSort = columns.some((column) => column.key === sort)
    ? sort
    : "createdAt";

  const sortedOrders = [...orders].sort((a, b) => {
    const first = a[validSort] ?? "";
    const second = b[validSort] ?? "";

    let comparison;

    if (validSort === "total") {
      comparison = Number(first) - Number(second);
    } else if (validSort === "createdAt") {
      comparison = new Date(first).getTime() - new Date(second).getTime();
    } else {
      comparison = String(first).localeCompare(String(second));
    }

    return direction === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number(page) || 1),
    totalPages
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleOrders = sortedOrders.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  function sortUrl(column) {
    const nextDirection =
      validSort === column && direction === "asc" ? "desc" : "asc";

    return `?sort=${column}&direction=${nextDirection}&page=1`;
  }

  function pageUrl(nextPage) {
    return `?sort=${validSort}&direction=${direction}&page=${nextPage}`;
  }

  return (
    <section className="dashboardTable">
      <div className="dashboardTableHeading">
        <div>
          <h2>Recent Orders</h2>
          <p>Sort by selecting a column heading.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span>{sortedOrders.length} orders</span>
          <ExportOrders orders={sortedOrders} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">
            Addis Eats orders, sortable by column
          </caption>

          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="p-3">
                  <Link
                    href={sortUrl(column.key)}
                    className="font-semibold hover:underline"
                    aria-label={`Sort by ${column.label}`}
                  >
                    {column.label}
                    {validSort === column.key
                      ? direction === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleOrders.length > 0 ? (
              visibleOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.name || "Customer"}</td>
                  <td className="p-3">{order.area || "Not recorded"}</td>
                  <td className="p-3">
                    {etb.format(Number(order.total || 0))}
                  </td>
                  <td className="p-3">
                    <span
                      className={`orderStatus ${
                        order.status === "cancelled"
                          ? "cancelled"
                          : "confirmed"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </td>
                  <td className="p-3">
                    {order.createdAt
                      ? when.format(new Date(order.createdAt))
                      : "Not recorded"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <p>
          {sortedOrders.length === 0
            ? "Showing 0 orders"
            : `Showing ${startIndex + 1}–${Math.min(
                startIndex + PAGE_SIZE,
                sortedOrders.length
              )} of ${sortedOrders.length} orders`}
        </p>

        <nav aria-label="Order table pagination" className="flex gap-2">
          {currentPage > 1 ? (
            <Link
              href={pageUrl(currentPage - 1)}
              className="rounded-lg border px-3 py-2"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-lg border px-3 py-2 opacity-50">
              Previous
            </span>
          )}

          <span className="px-3 py-2">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={pageUrl(currentPage + 1)}
              className="rounded-lg border px-3 py-2"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-lg border px-3 py-2 opacity-50">
              Next
            </span>
          )}
        </nav>
      </div>
    </section>
  );
}
