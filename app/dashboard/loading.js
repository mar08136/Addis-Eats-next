export default function DashboardLoading() {
  return (
    <main
      className="dashboardPage"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="dashboardContainer">
        <div className="dashboardSkeletonTitle" />

        <div className="dashboardMetrics">
          {[1, 2, 3].map((item) => (
            <div className="dashboardMetric" key={item}>
              <span className="dashboardSkeletonLine" />
              <div className="dashboardSkeletonHeading" />
              <span className="dashboardSkeletonLine" />
            </div>
          ))}
        </div>

        <div className="dashboardCharts">
          {[1, 2].map((item) => (
            <section className="dashboardChartCard" key={item}>
              <div className="dashboardSkeletonHeading" />
              <div className="dashboardSkeletonLine" />
              <div className="dashboardSkeletonChart" />
            </section>
          ))}
        </div>

        <section className="dashboardTableCard">
          <div className="dashboardSkeletonHeading" />

          <div className="dashboardTableScroll">
            <table className="dashboardOrdersTable">
              <caption>Loading recent orders</caption>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Neighbourhood</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
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
        </section>
      </div>
    </main>
  );
}