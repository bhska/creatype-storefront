"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TypeTester } from "@/components/TypeTester";
import { PricingSidebar } from "@/components/PricingSidebar";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import type { WCProduct } from "@/lib/woocommerce";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<WCProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function fetchProduct() {
    setLoading(true);
    try {
      const result = await apiClient.getProduct(slug, true);
      if (result.product) {
        setProduct(result.product);
        setRelatedProducts(result.relatedProducts || []);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart(licenses: Array<{ id: string; name: string; price: number }>, total: number) {
    if (!product) return;

    licenses.forEach((license) => {
      addItem({
        product_id: product.id,
        name: product.name,
        price: license.price,
        quantity: 1,
        image: product.images[0]?.src,
        slug: product.slug,
        license: license.name,
      });
    });

    toast.success(`Added ${licenses.length} license(s) to cart!`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-[#1a2b4d]/50 rounded-lg mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-[#1a2b4d]/50 rounded-lg" />
                <div className="h-96 bg-[#1a2b4d]/50 rounded-lg" />
              </div>
              <div className="h-[600px] bg-[#1a2b4d]/50 rounded-lg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-white text-2xl">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Product Hero */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Thumbnails */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-blue-500" : "border-white/10"
                      }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || product.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
                <Image
                  src={product.images[selectedImage]?.src || product.images[0]?.src}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-blue-600 text-white mb-2">
                    {product.categories[0]?.name || "Font"}
                  </Badge>
                  <h1 className="text-white text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-white/60">Digital Download</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-2xl font-bold">${product.price}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-3 ">
                <span className="text-white/60 text-sm">CONTACT US</span>
                <Share2 className="w-4 h-4 text-white/60" />
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <Twitter className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Type Tester */}
            <TypeTester />

            {/* Product Details */}
            <div className="bg-[#1a2b4d] border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-semibold text-xl mb-4">Product Detail</h2>
              <div
                className="text-white/80 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>

          {/* Right Column - Pricing Sidebar */}
          <div className="lg:col-span-1">
            <PricingSidebar
              basePrice={Number.parseFloat(product.price) || 0}
              productName={product.name}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-white text-2xl font-semibold ">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(p) => {
                    addItem({
                      product_id: p.id,
                      name: p.name,
                      price: Number.parseFloat(p.price) || 0,
                      quantity: 1,
                      image: p.images[0]?.src,
                      slug: p.slug,
                      license: "Desktop License",
                    });
                    toast.success("Added to cart!");
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
