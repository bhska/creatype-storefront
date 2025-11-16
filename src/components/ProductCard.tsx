import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { WCProduct } from "@/lib/woocommerce";

interface ProductCardProps {
  product: WCProduct;
  onAddToCart?: (product: WCProduct) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const category = product.categories[0]?.name.toUpperCase() || "FONT";
  const image = product.images[0]?.src || "/placeholder.png";

  return (
    <div className="group relative bg-[#1a2b4d]/50 rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs ml-2 shrink-0">
            {category}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
            >
              BUY NOW ${product.price}
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-white/70 hover:text-white h-8 w-8"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
