import Link from "next/link";
import { getSession } from "../../lib/session";
import { redirect } from "next/navigation";
import "./dashboard.css";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: "▦" },
  { label: "Orders", href: "/dashboard/orders", icon: "▤" },
  { label: "Menu Management", href: "/dashboard/menu", icon: "♨" },
  { label: "Deliveries", href: "/dashboard/deliveries", icon: "↗" },
  { label: "Reports", href: "/dashboard/reports", icon: "▥" },
  { label: "Customers", href: "/dashboard/customers", icon: "♙" },
];

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/dashboard");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <Link href="/dashboard" className="adminBrand">
          <span className="adminBrandIcon">A</span>
          <span>
            <strong>ADDIS EATS</strong>
            <small>ADMIN PANEL</small>
          </span>
        </Link>

        <p className="adminNavLabel">WORKSPACE</p>

        <nav className="adminNav" aria-label="Admin navigation">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="adminNavLink"
            >
              <span className="adminNavIcon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="adminSidebarBottom">
          <div className="adminUser">
            <span className="adminAvatar">S</span>
            <span>
              <strong>Staff account</strong>
              <small>Administrator</small>
            </span>
          </div>

          <Link href="/" className="adminBackLink">
            ← Back to website
          </Link>
        </div>
      </aside>

      <div className="adminMain">
        <header className="adminTopbar">
          <div>
            <p>ADDIS EATS / ADMINISTRATION</p>
            <strong>Restaurant management</strong>
          </div>

          <span className="adminStatus">
            <span />
            Admin workspace
          </span>
        </header>

        <div className="adminContent">{children}</div>
      </div>
    </div>
  );
}