import { NextRequest, NextResponse } from "next/server";
import { getProduct, getRelatedProducts, type WCProduct } from "@/lib/woocommerce";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const includeRelated = searchParams.get("related") === "true";

    const product = await getProduct(slug);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    let relatedProducts: WCProduct[] = [];
    if (includeRelated) {
      relatedProducts = await getRelatedProducts(product.id);
    }

    return NextResponse.json({
      product,
      relatedProducts: includeRelated ? relatedProducts : undefined,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
