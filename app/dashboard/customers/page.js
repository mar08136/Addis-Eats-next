
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/session";
import { orders } from "../../lib/orders";

export default async function CustomersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/dashboard/customers");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  const customerMap = new Map();

  for (const order of orders) {
    const customerId = order.userId || order.customerId || order.customerName;

    if (!customerId) continue;

    if (!customerMap.has(customerId)) {
      customerMap.set(customerId, {
        id: customerId,
        name: order.customerName || "Customer",
        orders: 0,
        totalSpent: 0,
        area: order.area || "Not specified",
      });
    }

    const customer = customerMap.get(customerId);
    customer.orders += 1;

    if (order.status !== "cancelled") {
      customer.totalSpent += Number(order.total || 0);
    }

    if (order.area) {
      customer.area = order.area;
    }
  }

  const customers = Array.from(customerMap.values());

  return (
    <div className="adminPage">
      <div className="adminPageHeader">
        <div>
          <h1>Customers</h1>
          <p>View customer activity from existing orders.</p>
        </div>
      </div>

      <div className="adminStatsGrid">
        <div className="adminStatCard">
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Repeat Customers</span>
          <strong>
            {customers.filter((customer) => customer.orders > 1).length}
          </strong>
        </div>
      </div>

      <section className="adminTableCard">
        <div className="adminTableHeader">
          <h2>Customer List</h2>
          <span>{customers.length} customers</span>
        </div>

        {customers.length === 0 ? (
          <p className="adminEmptyState">
            No customer records were found in the existing orders.
          </p>
        ) : (
          <div className="adminTableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Neighbourhood</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.area}</td>
                    <td>{customer.orders}</td>
                    <td>
                      ETB {customer.totalSpent.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="adminReportNote">
        Customer information is summarized from the current order data.
        This is not yet a complete customer database.
      </p>
    </div>
  );
}
