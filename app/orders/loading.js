export default function OrdersLoading() {
  return (
    <main className="dashboardPage" aria-busy="true" aria-label="Loading orders">
      <div className="dashboardContainer">
        <div className="dashboardSkeletonTitle" />
        <div className="dashboardTableCard">
          <div className="dashboardSkeletonHeading" />
          <div className="dashboardTableScroll">
            <table className="dashboardOrdersTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Neighbourhood</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row}>
                    {[1, 2, 3, 4, 5, 6].map((cell) => (
                      <td key={cell}>
                        <span className="dashboardSkeletonLine" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}