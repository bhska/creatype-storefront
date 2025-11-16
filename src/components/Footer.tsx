import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2563eb] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Payment Methods */}
          <div>
            <div className="text-2xl font-bold italic mb-6">
              Creatype Studio
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-2 rounded">
                <span className="text-[#2563eb] font-semibold text-sm">PayPal</span>
              </div>
              <div className="bg-white px-3 py-2 rounded">
                <span className="text-orange-500 font-semibold text-sm">MC</span>
              </div>
              <div className="bg-white px-3 py-2 rounded">
                <span className="text-[#1a1f71] font-semibold text-sm">VISA</span>
              </div>
            </div>
          </div>

          {/* Shop Fonts */}
          <div>
            <h3 className="font-semibold mb-4">SHOP FONTS</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/shop?category=serif" className="hover:text-white">
                  Serif
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sans-serif" className="hover:text-white">
                  Sans Serif
                </Link>
              </li>
              <li>
                <Link href="/shop?category=script" className="hover:text-white">
                  Script
                </Link>
              </li>
              <li>
                <Link href="/shop?category=brush" className="hover:text-white">
                  Brush
                </Link>
              </li>
              <li>
                <Link href="/shop?category=display" className="hover:text-white">
                  Display
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-white">
                  License
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-white">
                  Guest Post Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors"
              >
                <span className="text-sm font-semibold">Bē</span>
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors"
              >
                <span className="text-sm font-semibold">Dr</span>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors"
              >
                <span className="text-sm font-semibold">P</span>
              </a>
            </div>
            <div className="text-sm text-white/80">
              Copyright © 2018 - 2025 Creatype Studio. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
