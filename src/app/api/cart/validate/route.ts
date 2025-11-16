import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/woocommerce";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 }
      );
    }

    // Validate each cart item
    const validatedItems = await Promise.all(
      items.map(async (item: { product_id: number; quantity: number }) => {
        try {
          const product = await getProductById(item.product_id);
          return {
            product_id: item.product_id,
            name: product.name,
            price: Number.parseFloat(product.price),
            quantity: item.quantity,
            in_stock: true,
            valid: true,
          };
        } catch (error) {
          return {
            product_id: item.product_id,
            valid: false,
            error: "Product not found",
          };
        }
      })
    );

    const hasInvalidItems = validatedItems.some((item) => !item.valid);

    return NextResponse.json({
      items: validatedItems,
      valid: !hasInvalidItems,
    });
  } catch (error) {
    console.error("Error validating cart:", error);
    return NextResponse.json(
      { error: "Failed to validate cart" },
      { status: 500 }
    );
  }
}
