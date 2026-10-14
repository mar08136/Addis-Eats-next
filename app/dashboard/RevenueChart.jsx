
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const formatETB = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart({ revenueData, ordersData }) {
  return (
    <div className="dashboardCharts">
      <section className="dashboardChartCard">
        <h2>Revenue by Neighbourhood</h2>
        <p>Revenue in Ethiopian birr (ETB)</p>

        <div className="dashboardChart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis
                width={85}
                tickFormatter={(value) => formatETB(value)}
              />
              <Tooltip
                formatter={(value) => [formatETB(value), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#9e5b24" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <table className="dashboardDataTable">
          <caption>Revenue by neighbourhood</caption>
          <thead>
            <tr>
              <th>Neighbourhood</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item) => (
              <tr key={item.area}>
                <td>{item.area}</td>
                <td>{formatETB(item.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboardChartCard">
        <h2>Orders Over Time</h2>
        <p>Number of orders per day</p>

        <div className="dashboardChart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#884b1a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <table className="dashboardDataTable">
          <caption>Orders per day</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
