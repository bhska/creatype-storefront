"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <nav className="border-b border-background/10 bg-card sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Creatype Studio" width={32} height={32} />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/shop" className="text-muted-foreground hover:text-foreground text-sm">
                Shop
              </Link>
              <Link href="/license" className="text-muted-foreground hover:text-foreground text-sm">
                License
              </Link>
              <Link href="/service" className="text-muted-foreground hover:text-foreground text-sm">
                Service
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm">
                Blog
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm">
                Contact
              </Link>
              <Link
                href="/custom-license"
                className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1"
              >
                Custom License <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground/80">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/checkout">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground/80 relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground/80">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
