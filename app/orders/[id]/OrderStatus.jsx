"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import { when } from "../../../lib/format";
import MapPanel from "./MapPanel";

const statusSteps = [
  "confirmed",
  "preparing",
  "on-the-way",
  "delivered",
];

const statusLabels = {
  confirmed: "Order confirmed",
  preparing: "Preparing your food",
  "on-the-way": "On the way",
  delivered: "Delivered",
};

export default function OrderStatus({ orderId, initialOrder }) {
  const [liveStatus, setLiveStatus] = useState(initialOrder.status);
  const [connection, setConnection] = useState("Connecting");

  const { data, error, isLoading } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    if (data?.status) {
      setLiveStatus(data.status);
    }
  }, [data?.status]);

  useEffect(() => {
    if (initialOrder.status === "delivered") {
      setConnection("Delivered");
      return;
    }

    const source = new EventSource(`/api/orders/${orderId}/stream`);

    source.onopen = () => setConnection("Live");
    source.onmessage = (event) => {
      const update = JSON.parse(event.data);

      if (update.status) {
        setLiveStatus(update.status);
      }

      if (update.status === "delivered") {
        setConnection("Delivered");
        source.close();
      }
    };

    source.onerror = () => {
      setConnection("Reconnecting");
    };

    return () => source.close();
  }, [orderId, initialOrder.status]);

  if (error) {
    return <p className="p-6 text-[#884b1a]">Unable to refresh order details.</p>;
  }

  if (isLoading && !data) {
    return <p className="p-6">Loading order...</p>;
  }

  const currentStep = statusSteps.indexOf(liveStatus);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <div className="rounded-2xl border border-[#e8ddd5] bg-[#fffaf7] p-6">
        <p className="text-sm text-[#6b605a]">Order tracking</p>

        <h1 className="mt-2 text-2xl font-bold text-[#25211f]">
          Your order
        </h1>

        <p className="mt-2 break-all text-sm text-[#6b605a]">
          Order ID: {orderId}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              connection === "Live" ? "bg-[#9e5b24]" : "bg-[#6b605a]"
            }`}
          />
          <span className="text-[#6b605a]">
            Updates: {connection}
          </span>
        </div>

        <p className="mt-5 text-lg font-semibold text-[#884b1a]">
          {statusLabels[liveStatus] || liveStatus}
        </p>

        <ol className="mt-6 space-y-4">
          {statusSteps.map((step, index) => {
            const completed = currentStep >= index;

            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
                    completed
                      ? "bg-[#9e5b24] text-white"
                      : "bg-[#f8f1ed] text-[#6b605a]"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </span>

                <span
                  className={
                    completed
                      ? "font-medium text-[#25211f]"
                      : "text-[#6b605a]"
                  }
                >
                  {statusLabels[step]}
                </span>
              </li>
            );
          })}
        </ol>

        {data?.createdAt && (
          <p className="mt-5 text-sm text-[#6b605a]">
            Ordered: {when.format(new Date(data.createdAt))}
          </p>
        )}
      </div>

      <MapPanel />

      <p className="mt-4 text-sm text-[#6b605a]">
        Current status: {statusLabels[liveStatus] || liveStatus}. This page
        updates when the order status changes.
      </p>
    </main>
  );
}