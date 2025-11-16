"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface License {
  id: string;
  name: string;
  price: number;
  description: string;
  featured?: boolean;
}

interface PricingSidebarProps {
  basePrice: number;
  productName: string;
  onAddToCart: (licenses: License[], total: number) => void;
}

const licenses: License[] = [
  { id: "desktop", name: "Desktop License", price: 25, description: "For desktop use", featured: true },
  { id: "webfont", name: "Web Font License", price: 49, description: "For web projects" },
  { id: "extended", name: "Extended License", price: 199, description: "Commercial use" },
  { id: "social", name: "Social Media Content Creator", price: 199, description: "For social media" },
  { id: "logo", name: "Logo Licenses", price: 179, description: "For logo design" },
  { id: "app", name: "App/Game Licenses", price: 349, description: "For apps & games" },
  { id: "server", name: "Server License", price: 549, description: "For server use" },
  { id: "broadcast", name: "Broadcast License", price: 1499, description: "TV/broadcast use" },
  { id: "corporate", name: "Corporate License", price: 3499, description: "Enterprise use" },
];

export function PricingSidebar({ basePrice, productName, onAddToCart }: PricingSidebarProps) {
  const [selectedLicenses, setSelectedLicenses] = useState<Set<string>>(new Set());

  const toggleLicense = (licenseId: string) => {
    const newSelected = new Set(selectedLicenses);
    if (newSelected.has(licenseId)) {
      newSelected.delete(licenseId);
    } else {
      newSelected.add(licenseId);
    }
    setSelectedLicenses(newSelected);
  };

  const totalPrice = Array.from(selectedLicenses).reduce((sum, id) => {
    const license = licenses.find((l) => l.id === id);
    return sum + (license?.price || 0);
  }, 0);

  const handleAddToCart = () => {
    const selected = licenses.filter((l) => selectedLicenses.has(l.id));
    onAddToCart(selected, totalPrice);
  };

  return (
    <Card className="bg-[#1a2b4d] border-white/10 p-6 sticky top-24">
      <div className="mb-6">
        <Badge className="bg-blue-600 text-white mb-2">30% OFF until November Extended of 2 weeks</Badge>
        <h3 className="text-white font-semibold text-lg mb-1">{productName}</h3>
        <p className="text-white/60 text-sm">Digital Download</p>
      </div>

      <div className="space-y-3 mb-6">
        {licenses.map((license) => (
          <div
            key={license.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => toggleLicense(license.id)}
          >
            <Checkbox
              checked={selectedLicenses.has(license.id)}
              onCheckedChange={() => toggleLicense(license.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-medium">{license.name}</span>
                <span className="text-white text-sm">${license.price}</span>
              </div>
              <p className="text-white/60 text-xs">{license.description}</p>
              {license.featured && (
                <Badge variant="outline" className="mt-1 text-xs border-blue-500 text-blue-400">
                  Popular
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white text-sm">Total</span>
          <span className="text-white text-2xl font-bold">${totalPrice}</span>
        </div>
        <p className="text-white/60 text-xs">Discount</p>
      </div>

      <div className="space-y-2">
        <Button
          onClick={handleAddToCart}
          disabled={selectedLicenses.size === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          ADD TO CART
        </Button>
        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
          CONTACT US
        </Button>
      </div>

      <p className="text-white/60 text-xs mt-4 text-center">
        Please do add to cart <br />
        Instant Digital Download
      </p>
    </Card>
  );
}
