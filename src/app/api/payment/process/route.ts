import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/woocommerce";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentMethod } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Get order details from WooCommerce to retrieve payment_url
    const order = await getOrder(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // WooCommerce generates payment_url for the order based on the selected payment gateway
    // This URL is specific to the payment method configured in WooCommerce
    const paymentUrl = order.payment_url || null;

    // Determine instructions based on payment method
    let instructions = "Please complete your payment to finalize the order.";
    
    if (paymentMethod === "paypal") {
      instructions = "You will be redirected to PayPal to complete your payment securely.";
    } else if (paymentMethod === "credit-card" || paymentMethod === "stripe") {
      instructions = "You will be redirected to our secure payment page to complete your credit card payment.";
    } else if (paymentMethod === "bacs" || paymentMethod === "bank-transfer") {
      instructions = "Please follow the bank transfer instructions in your order confirmation email.";
    } else if (paymentMethod === "cod") {
      instructions = "You have selected Cash on Delivery. Payment will be collected upon delivery.";
    }

    // If payment URL exists, customer should be redirected
    // If not, show instructions (for manual payment methods)
    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId,
      paymentMethod,
      instructions,
      orderStatus: order.status,
      orderTotal: order.total
    });

  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
