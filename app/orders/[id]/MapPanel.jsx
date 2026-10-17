"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-2xl bg-[#f8f1ed] text-[#6b605a]">
      Loading delivery map...
    </div>
  ),
});

export default function MapPanel() {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-lg font-semibold text-[#25211f]">
        Delivery location
      </h3>

      <div className="h-80 overflow-hidden rounded-2xl border border-[#e8ddd5]">
        <DeliveryMap />
      </div>

      <p className="mt-3 text-sm text-[#6b605a]">
        The map currently shows sample courier and delivery locations around Bole.
      </p>
    </section>
  );
}