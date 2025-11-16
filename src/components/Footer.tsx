import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Payment Methods */}
          <div>
            <Link href="/" className="inline-block ">
              <Image src="/logo.svg" alt="Creatype Studio" width={120} height={86} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 opacity-80 mt-6">
                <div className="bg-background px-3 py-2 rounded-lg border border-border/50 flex items-center">
                  <span className="text-foreground font-semibold text-xs">PayPal</span>
                </div>
                <div className="bg-background px-3 py-2 rounded-lg border border-border/50 flex items-center">
                  <span className="text-orange-600 font-semibold text-xs">MC</span>
                </div>
                <div className="bg-background px-3 py-2 rounded-lg border border-border/50 flex items-center">
                  <span className="text-blue-600 font-semibold text-xs">VISA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Fonts */}
          <div>
            <h3 className="font-semibold mb-3 text-sm tracking-wider">SHOP FONTS</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li>
                <Link href="/shop?category=serif" className="hover:text-primary-foreground">
                  Serif
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sans-serif" className="hover:text-primary-foreground">
                  Sans Serif
                </Link>
              </li>
              <li>
                <Link href="/shop?category=script" className="hover:text-primary-foreground">
                  Script
                </Link>
              </li>
              <li>
                <Link href="/shop?category=brush" className="hover:text-primary-foreground">
                  Brush
                </Link>
              </li>
              <li>
                <Link href="/shop?category=display" className="hover:text-primary-foreground">
                  Display
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-sm tracking-wider">COMPANY</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li>
                <Link href="/about" className="hover:text-primary-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-primary-foreground">
                  License
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-sm tracking-wider">LEGAL</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-foreground">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-primary-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary-foreground">
                  Guest Post Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/50 hover:bg-background/80 p-2 rounded-lg transition-colors text-foreground border border-border/50"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/50 hover:bg-background/80 p-2 rounded-lg transition-colors text-foreground border border-border/50"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="text-sm text-primary-foreground/70">
              Copyright © 2018 - 2025 Creatype Studio. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
