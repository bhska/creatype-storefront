import { NextRequest, NextResponse } from "next/server";
import { createOrder, type CheckoutData } from "@/lib/woocommerce";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.billing || !body.line_items || body.line_items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate billing information
    const requiredBillingFields = [
      "first_name",
      "last_name",
      "address_1",
      "city",
      "state",
      "postcode",
      "country",
      "email",
    ];

    for (const field of requiredBillingFields) {
      if (!body.billing[field]) {
        return NextResponse.json(
          { error: `Missing required billing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const orderData: CheckoutData = {
      billing: body.billing,
      line_items: body.line_items,
      payment_method: body.payment_method || "paypal",
      payment_method_title: body.payment_method_title || "PayPal",
      coupon_lines: body.coupon_lines || [],
    };

    const order = await createOrder(orderData);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
