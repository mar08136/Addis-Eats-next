"use client";

export default function DashboardError({ reset }) {
  return (
    <main className="dashboardPage">
      <section className="dashboardEmpty dashboardErrorState">
        <h1>Dashboard couldn't load</h1>
        <p>Something went wrong while loading the analytics.</p>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}