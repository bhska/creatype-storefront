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
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
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
            <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs ml-2 shrink-0">
            {category}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
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
            className="text-muted-foreground hover:text-foreground h-8 w-8"
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
