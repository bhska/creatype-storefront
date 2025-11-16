import { NextResponse } from "next/server";
import { getPaymentGateways } from "@/lib/woocommerce";

export async function GET() {
  try {
    const gateways = await getPaymentGateways();
    return NextResponse.json({ gateways });
  } catch (error) {
    console.error("Error fetching payment gateways:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment gateways" },
      { status: 500 }
    );
  }
}
