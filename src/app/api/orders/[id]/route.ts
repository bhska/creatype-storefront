import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/woocommerce";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number.parseInt(id);

    if (Number.isNaN(orderId)) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const order = await getOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
