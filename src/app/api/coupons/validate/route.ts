import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/woocommerce";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await validateCoupon(code);

    if (!coupon) {
      return NextResponse.json(
        { error: "Invalid coupon code", valid: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ coupon, valid: true });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { error: "Failed to validate coupon", valid: false },
      { status: 500 }
    );
  }
}
