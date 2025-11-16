"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Lightbulb, DollarSign, Layers, FileCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import type { WCProduct } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export default function Home() {
  const [latestFonts, setLatestFonts] = useState<WCProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<WCProduct[]>([]);
  const [featuredFonts, setFeaturedFonts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  async function fetchHomeProducts() {
    setLoading(true);
    setError(null);
    try {
      // Fetch latest products
      const latestResult = await apiClient.getProducts({
        per_page: 8,
        orderby: 'date',
        order: 'desc'
      });
      setLatestFonts(latestResult.products);

      // Fetch best sellers (featured products)
      const bestSellersResult = await apiClient.getProducts({
        per_page: 6,
        orderby: 'date',
        order: 'desc'
      });
      setBestSellers(bestSellersResult.products);

      // Fetch featured fonts (more products)
      const featuredResult = await apiClient.getProducts({
        per_page: 9,
        orderby: 'popularity',
        order: 'desc'
      });
      setFeaturedFonts(featuredResult.products);
    } catch (error) {
      console.error("Error fetching home products:", error);
      setError("Failed to load products. Please try again later.");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (product: WCProduct) => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src || "/placeholder.png",
      license: "Standard License",
      quantity: 1
    });
    toast.success(`${product.name} added to cart`);
  };

  const brandLogos = [
    "https://ext.same-assets.com/1839301121/1602260894.webp",
    "https://ext.same-assets.com/1839301121/3413358681.webp",
    "https://ext.same-assets.com/1839301121/2969920653.webp",
    "https://ext.same-assets.com/1839301121/1198088482.webp",
    "https://ext.same-assets.com/1839301121/4008922413.webp",
    "https://ext.same-assets.com/1839301121/1726052917.webp",
    "https://ext.same-assets.com/1839301121/2573848777.webp",
    "https://ext.same-assets.com/1839301121/125418395.webp",
    "https://ext.same-assets.com/1839301121/487208864.webp",
    "https://ext.same-assets.com/1839301121/3329587760.webp",
    "https://ext.same-assets.com/1839301121/989747804.png",
    "https://ext.same-assets.com/1839301121/751513324.webp",
    "https://ext.same-assets.com/1839301121/3698848980.webp",
    "https://ext.same-assets.com/1839301121/381757991.webp",
    "https://ext.same-assets.com/1839301121/119951897.webp",
  ];

  const blogPosts = [
    {
      title: "10 Common Font License Types and How to Choose Right One",
      date: "November 12, 2025",
      excerpt: "Knowing font license types is crucial for anyone who uses typography in design or business...",
      image: "https://ext.same-assets.com/1839301121/933282807.jpeg"
    },
    {
      title: "From Blurry to Sharp: Turning Low-Quality Shots Into Scroll-Stopping Posts",
      date: "November 11, 2025",
      excerpt: "We've all been there: looking through camera roll to locate a photo that captures the ideal mood...",
      image: "https://ext.same-assets.com/1839301121/2811074827.webp"
    },
    {
      title: "Why Font Licensing for Commercial Use Matters for Your Brand",
      date: "November 10, 2025",
      excerpt: "In recent years, font licensing for commercial use has become a serious issue...",
      image: "https://ext.same-assets.com/1839301121/757974355.webp"
    },
    {
      title: "Best Way to Complete a PowerPoint Download via Microsoft Account",
      date: "November 3, 2025",
      excerpt: "A Microsoft account is a unification of all Microsoft services in a single identity...",
      image: "https://ext.same-assets.com/1839301121/757974355.webp"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative bg-linear-to-b from-[#1a2b4d] to-[#0f1724] py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-light text-foreground mb-8 leading-tight">
              Good Font is<br />A Good Brand
            </h1>
          </div>

          {/* Carousel Section */}
          <div className="mt-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <Card className="bg-yellow-400 border-0 overflow-hidden h-80 relative">
                <img src="https://ext.same-assets.com/1839301121/1069170024.webp" alt="POND'S" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 text-gray-900">
                  <p className="text-sm font-medium">Jelytta Handwritten Script</p>
                </div>
              </Card>
              <Card className="bg-cyan-400 border-0 overflow-hidden h-80 relative">
                <img src="https://ext.same-assets.com/1839301121/1681791624.webp" alt="POND'S" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <h3 className="text-xl font-light text-foreground mb-1">Jelytta Font Gives</h3>
                  <p className="text-2xl font-medium text-gray-900">POND'S x Maudy<br />Ayunda a Signature Look</p>
                </div>
              </Card>
              <Card className="bg-pink-500 border-0 overflow-hidden h-80 relative">
                <img src="https://ext.same-assets.com/1839301121/996251369.webp" alt="POND'S" className="w-full h-full object-cover" />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-foreground mb-4">Discover Your Perfect<br />Font Match</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Search our curated collection of premium fonts to enhance your design projects effortlessly.
          </p>
        </div>
      </section>

      {/* Latest Fonts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-foreground border-b border-white/20 pb-2 inline-block">Latest Fonts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full flex justify-center items-center min-h-[400px]">
                <div className="text-foreground">Loading products...</div>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col justify-center items-center min-h-[400px] text-center">
                <div className="text-destructive mb-4">{error}</div>
                <Button onClick={fetchHomeProducts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              latestFonts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="bg-primary hover:bg-primary/90 text-foreground">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-foreground border-b border-white/20 pb-2 inline-block">Best Seller</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-full flex justify-center items-center min-h-[400px]">
                <div className="text-foreground">Loading products...</div>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col justify-center items-center min-h-[400px] text-center">
                <div className="text-destructive mb-4">{error}</div>
                <Button onClick={fetchHomeProducts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="bg-primary hover:bg-primary/90 text-foreground">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Fonts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-foreground border-b border-white/20 pb-2 inline-block">Featured Fonts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-full flex justify-center items-center min-h-[400px]">
                <div className="text-foreground">Loading products...</div>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col justify-center items-center min-h-[400px] text-center">
                <div className="text-destructive mb-4">{error}</div>
                <Button onClick={fetchHomeProducts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              featuredFonts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="bg-primary hover:bg-primary/90 text-foreground">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-foreground mb-12">Trusted by Creative at</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 items-center opacity-60">
            {brandLogos.map((logo, idx) => (
              <div key={idx} className="bg-background p-4 rounded flex items-center justify-center h-20">
                <img src={logo} alt={`Brand ${idx + 1}`} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-foreground mb-4">Why Choose Us</h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Search our curated collection of premium fonts to enhance your design projects effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl text-foreground mb-2">Innovative design solutions</h3>
              <p className="text-foreground/60 text-sm">We create unique and tailored design solutions that elevate your brand.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl text-foreground mb-2">Competitive pricing</h3>
              <p className="text-foreground/60 text-sm">We offer premium design services at competitive prices.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <Layers className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl text-foreground mb-2">Many style available</h3>
              <p className="text-foreground/60 text-sm">Explore our collection of fonts, featuring a wide range of style to meet ur design.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl text-foreground mb-2">All license you need</h3>
              <p className="text-foreground/60 text-sm">We offer all the licenses you need to use our products confidently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom License CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-light text-foreground ">How About a<br />Custom<br />License?</h2>
            <p className="text-foreground/90 mb-8 max-w-md">
              We offer a custom licenses for clients who are looking for a tailored solution. We work directly for brands and advertising agencies
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 px-8">
              CONTACT US NOW <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Font In Use */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-foreground mb-12">Font In Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="aspect-square overflow-hidden rounded">
              <img src="https://ext.same-assets.com/1839301121/1345470891.webp" alt="Font in use 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square overflow-hidden rounded">
              <img src="https://ext.same-assets.com/1839301121/1426913801.webp" alt="Font in use 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square overflow-hidden rounded">
              <img src="https://ext.same-assets.com/1839301121/2853165301.webp" alt="Font in use 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-foreground mb-4">What's New Today!</h2>
            <p className="text-foreground/70">Stay inspired with expert tips, design trends, and creative ideas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="bg-[#1a1f2e] border-white/10 overflow-hidden group hover:border-primary transition-colors py-0">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <Badge className="mb-3 bg-primary text-foreground text-xs">{post.date}</Badge>
                  <h3 className="text-foreground font-medium mb-2 line-clamp-2 text-sm">{post.title}</h3>
                  <p className="text-foreground/60 text-xs mb-4 line-clamp-2">{post.excerpt}</p>
                  <Button variant="link" className="text-foreground p-0 h-auto">
                    READ MORE <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-foreground">
              SEE MORE BLOG <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
