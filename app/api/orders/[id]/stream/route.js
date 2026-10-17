
import { NextResponse } from "next/server";
import { orders } from "../../../../lib/orders";
import { getSession } from "../../../../../lib/session";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must sign in first" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const order = orders.find(
    (currentOrder) =>
      currentOrder.id === id && currentOrder.userId === session.id
  );

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  const encoder = new TextEncoder();
  let interval;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      let previousStatus = null;

      const closeStream = () => {
        if (closed) return;

        closed = true;
        clearInterval(interval);

        try {
          controller.close();
        } catch {}
      };

      const sendEvent = (data) => {
        if (closed) return;

        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          closeStream();
        }
      };

      const sendStatus = () => {
        if (closed) return;

        const currentOrder = orders.find(
          (item) =>
            item.id === id && item.userId === session.id
        );

        if (!currentOrder) {
          sendEvent({ error: "Order not found" });
          closeStream();
          return;
        }

        if (currentOrder.status !== previousStatus) {
          previousStatus = currentOrder.status;

          sendEvent({
            id: currentOrder.id,
            status: currentOrder.status,
          });
        }

        if (currentOrder.status === "delivered") {
          closeStream();
        }
      };

      request.signal.addEventListener("abort", closeStream, {
        once: true,
      });

      controller.enqueue(
        encoder.encode("retry: 3000\n: Connected\n\n")
      );

      sendStatus();

      if (!closed) {
        interval = setInterval(sendStatus, 3000);
      }
    },

    cancel() {
      closed = true;
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
