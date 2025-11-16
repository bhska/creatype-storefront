"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Lightbulb, DollarSign, Layers, FileCheck } from "lucide-react";

export default function Home() {
  const latestFonts = [
    { name: "Elanor Retro Display", category: "DISPLAY", price: "$25", image: "https://ext.same-assets.com/1839301121/2981467988.png" },
    { name: "Ravioli Whimsical", category: "DISPLAY", price: "$25", image: "https://ext.same-assets.com/1839301121/1908426588.png" },
    { name: "Rockville Versatility Serif", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/550509967.png" },
    { name: "Kithara Sophisticated", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/1998126962.png" },
    { name: "Astragon Modern", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/1833752454.png" },
    { name: "Marline Beautiful Sans", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/2500002024.png" },
    { name: "Baginks Birkin Serif", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/2577966116.png" },
    { name: "Bentley Monoline", category: "SANS", price: "$25", image: "https://ext.same-assets.com/1839301121/1951798213.png" },
  ];

  const bestSellers = [
    { name: "Brittany Signature Script", category: "SCRIPT", price: "$29", image: "https://ext.same-assets.com/1839301121/1103957144.jpeg" },
    { name: "Gistesy Signature", category: "SCRIPT", price: "$25", image: "https://ext.same-assets.com/1839301121/3774480499.png" },
    { name: "Halimun Script Style", category: "SCRIPT", price: "$25", image: "https://ext.same-assets.com/1839301121/1342859359.png" },
    { name: "Barcelony Signature", category: "SCRIPT", price: "$19", image: "https://ext.same-assets.com/1839301121/1850557146.jpeg" },
    { name: "White Angelica", category: "SCRIPT", price: "$19", image: "https://ext.same-assets.com/1839301121/883772303.jpeg" },
    { name: "Mistrully Brush Script", category: "BRUSH", price: "$25", image: "https://ext.same-assets.com/1839301121/2952094463.jpeg" },
  ];

  const featuredFonts = [
    { name: "Nightmare Bloody Thriller", category: "DISPLAY", price: "$25", image: "https://ext.same-assets.com/1839301121/3364897408.jpeg" },
    { name: "Gaston & Jacklyn Stylish", category: "SCRIPT", price: "$25", image: "https://ext.same-assets.com/1839301121/3135795265.jpeg" },
    { name: "Wastogi Beautiful Serif", category: "SERIF", price: "$25", image: "https://ext.same-assets.com/1839301121/3575210611.png" },
    { name: "Nawacitha Display Curly", category: "SCRIPT", price: "$25", image: "https://ext.same-assets.com/1839301121/3324040850.png" },
    { name: "Mossley Signature", category: "SCRIPT", price: "$19", image: "https://ext.same-assets.com/1839301121/1508587185.jpeg" },
    { name: "Forester Hand Brush", category: "DISPLAY", price: "$25", image: "https://ext.same-assets.com/1839301121/724417629.jpeg" },
    { name: "Estelly Stylish Signature", category: "SCRIPT", price: "$19", image: "https://ext.same-assets.com/1839301121/1973268643.jpeg" },
    { name: "Bentley Monoline Vintage", category: "SANS", price: "$25", image: "https://ext.same-assets.com/1839301121/1951798213.png" },
    { name: "Jabawoky Stylish", category: "DISPLAY", price: "$19", image: "https://ext.same-assets.com/1839301121/1521969843.jpeg" },
  ];

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
      title: "10 Common Font License Types and How to Choose the Right One",
      date: "November 12, 2025",
      excerpt: "Knowing font license types is crucial for anyone who uses typography in design or business...",
      image: "https://ext.same-assets.com/1839301121/933282807.jpeg"
    },
    {
      title: "From Blurry to Sharp: Turning Low-Quality Shots Into Scroll-Stopping Posts",
      date: "November 11, 2025",
      excerpt: "We've all been there: looking through the camera roll to locate a photo that captures the ideal mood...",
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
    <div className="min-h-screen bg-[#0f1724]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-[#1a2b4d] to-[#0f1724] py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-light text-white mb-8 leading-tight">
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
                  <h3 className="text-xl font-light text-white mb-1">Jelytta Font Gives</h3>
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
      <section className="py-20 bg-[#1a2b4d]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-white mb-4">Discover Your Perfect<br />Font Match</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Search our curated collection of premium fonts to enhance your design projects effortlessly.
          </p>
        </div>
      </section>

      {/* Latest Fonts */}
      <section className="py-20 bg-[#0f1724]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-white border-b border-white/20 pb-2 inline-block">Latest Fonts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {latestFonts.map((font, idx) => (
              <Link key={idx} href={`/product/${font.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="bg-[#1a1f2e] border-white/10 overflow-hidden group hover:border-primary transition-colors">
                  <div className="aspect-4/3 overflow-hidden bg-white/5">
                    <Image src={font.image} alt={font.name} width={400} height={300} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 truncate">{font.name}</h3>
                    <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">{font.category}</Badge>
                    <Button className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10">
                      BUY NOW {font.price}
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="py-20 bg-[#0f1724]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-white border-b border-white/20 pb-2 inline-block">Best Seller</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {bestSellers.map((font, idx) => (
              <Link key={idx} href={`/product/${font.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="bg-[#1a1f2e] border-white/10 overflow-hidden group hover:border-primary transition-colors">
                  <div className="aspect-4/3 overflow-hidden bg-white/5">
                    <Image src={font.image} alt={font.name} width={400} height={300} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate">{font.name}</h3>
                  <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">{font.category}</Badge>
                    <Button className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10">
                      BUY NOW {font.price}
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Fonts */}
      <section className="py-20 bg-[#0f1724]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-3xl font-light text-white border-b border-white/20 pb-2 inline-block">Featured Fonts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredFonts.map((font, idx) => (
              <Link key={idx} href={`/product/${font.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="bg-[#1a1f2e] border-white/10 overflow-hidden group hover:border-primary transition-colors">
                  <div className="aspect-4/3 overflow-hidden bg-white/5">
                    <Image src={font.image} alt={font.name} width={400} height={300} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate">{font.name}</h3>
                  <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">{font.category}</Badge>
                  <Button className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10">
                    BUY NOW {font.price}
                  </Button>
                </div>
              </Card>
            </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              FIND MORE <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-[#1a2b4d]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-white mb-12">Trusted by Creative at</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 items-center opacity-60">
            {brandLogos.map((logo, idx) => (
              <div key={idx} className="bg-[#0f1724] p-4 rounded flex items-center justify-center h-20">
                <img src={logo} alt={`Brand ${idx + 1}`} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1a2b4d]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-4">Why Choose Us</h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Search our curated collection of premium fonts to enhance your design projects effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Innovative design solutions</h3>
              <p className="text-white/60 text-sm">We create unique and tailored design solutions that elevate your brand.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Competitive pricing</h3>
              <p className="text-white/60 text-sm">We offer premium design services at competitive prices.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Many style available</h3>
              <p className="text-white/60 text-sm">Explore our collection of fonts, featuring a wide range of style to meet ur design.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded mx-auto mb-4 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">All license you need</h3>
              <p className="text-white/60 text-sm">We offer all the licenses you need to use our products confidently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom License CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-light text-white mb-6">How About a<br />Custom<br />License?</h2>
            <p className="text-white/90 mb-8 max-w-md">
              We offer a custom licenses for clients who are looking for a tailored solution. We work directly for brands and advertising agencies
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 px-8">
              CONTACT US NOW <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Font In Use */}
      <section className="py-20 bg-[#1a2b4d]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-white mb-12">Font In Use</h2>
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
      <section className="py-20 bg-[#1a2b4d]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-4">What's New Today!</h2>
            <p className="text-white/70">Stay inspired with expert tips, design trends, and creative ideas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="bg-[#1a1f2e] border-white/10 overflow-hidden group hover:border-primary transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <Badge className="mb-3 bg-primary text-white text-xs">{post.date}</Badge>
                  <h3 className="text-white font-medium mb-2 line-clamp-2 text-sm">{post.title}</h3>
                  <p className="text-white/60 text-xs mb-4 line-clamp-2">{post.excerpt}</p>
                  <Button variant="link" className="text-white p-0 h-auto">
                    READ MORE <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              SEE MORE BLOG <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
