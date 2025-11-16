import { NextRequest, NextResponse } from "next/server";
import { getProducts, getProductCategories } from "@/lib/woocommerce";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action");

    // Handle categories request
    if (action === "categories") {
      const categories = await getProductCategories();
      return NextResponse.json({ categories });
    }

    // Handle products request
    const page = Number.parseInt(searchParams.get("page") || "1");
    const perPage = Number.parseInt(searchParams.get("per_page") || "12");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const orderby = searchParams.get("orderby") || "date";
    const order = (searchParams.get("order") || "desc") as "asc" | "desc";

    const result = await getProducts({
      page,
      per_page: perPage,
      category: category !== "all" ? category : undefined,
      search,
      orderby,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
