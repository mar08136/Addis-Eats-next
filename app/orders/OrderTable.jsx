import Link from "next/link";

const PAGE_SIZE = 5;

function buildHref(page, sortBy, direction) {
  const params = new URLSearchParams({
    page: String(page),
    sort: sortBy,
    direction,
  });

  return `/dashboard?${params.toString()}`;
}

export default function OrderTable({
  orders,
  sort = "createdAt",
  direction = "desc",
  page = 1,
}) {
  const sortedOrders = [...orders].sort((a, b) => {
    let first = a[sort] ?? "";
    let second = b[sort] ?? "";

    if (sort === "total") {
      first = Number(first);
      second = Number(second);
    } else {
      first = String(first).toLowerCase();
      second = String(second).toLowerCase();
    }

    if (first < second) return direction === "asc" ? -1 : 1;
    if (first > second) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageOrders = sortedOrders.slice(startIndex, startIndex + PAGE_SIZE);

  const nextDirection = (column) =>
    sort === column && direction === "asc" ? "desc" : "asc";

  return (
    <section className="dashboardTableCard">
      <div className="dashboardTableHeading">
        <div>
          <h2>Recent Orders</h2>
          <p>Sort by selecting a column heading.</p>
        </div>
        <span>{sortedOrders.length} orders</span>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="dashboardEmpty">
          <h3>No orders yet</h3>
          <p>Orders will appear here after customers place them.</p>
        </div>
      ) : (
        <>
          <div className="dashboardTableScroll">
            <table className="dashboardOrdersTable">
              <caption>Orders sorted by {sort}, {direction === "asc" ? "ascending" : "descending"}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <Link href={buildHref(1, "id", nextDirection("id"))}>
                      Order ID
                    </Link>
                  </th>
                  <th scope="col">
                    <Link href={buildHref(1, "name", nextDirection("name"))}>
                      Customer
                    </Link>
                  </th>
                  <th scope="col">
                    <Link href={buildHref(1, "area", nextDirection("area"))}>
                      Neighbourhood
                    </Link>
                  </th>
                  <th scope="col">
                    <Link href={buildHref(1, "total", nextDirection("total"))}>
                      Total
                    </Link>
                  </th>
                  <th scope="col">
                    <Link href={buildHref(1, "status", nextDirection("status"))}>
                      Status
                    </Link>
                  </th>
                  <th scope="col">
                    <Link href={buildHref(1, "createdAt", nextDirection("createdAt"))}>
                      Date
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name || "Customer"}</td>
                    <td>{order.area || "Not recorded"}</td>
                    <td>{Number(order.total || 0).toLocaleString("en-ET")} ETB</td>
                    <td>
                      <span className={`dashboardStatus ${order.status === "cancelled" ? "isCancelled" : ""}`}>
                        {order.status || "unknown"}
                      </span>
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-ET")
                        : "Not recorded"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="dashboardPagination" aria-label="Order table pages">
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, sortedOrders.length)} of {sortedOrders.length}
            </span>
            <div>
              {currentPage > 1 && (
                <Link href={buildHref(currentPage - 1, sort, direction)}>
                  Previous
                </Link>
              )}
              <span>Page {currentPage} of {totalPages}</span>
              {currentPage < totalPages && (
                <Link href={buildHref(currentPage + 1, sort, direction)}>
                  Next
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </section>
  );
}