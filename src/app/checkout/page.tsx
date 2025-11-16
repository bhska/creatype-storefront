"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    email: "",
    orderNotes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const applyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const result = await apiClient.validateCoupon(couponCode);
      if (result.valid && result.coupon) {
        const discountAmount = 
          result.coupon.discount_type === "percent"
            ? totalPrice * (Number.parseFloat(result.coupon.amount) / 100)
            : Number.parseFloat(result.coupon.amount);
        setDiscount(discountAmount);
        toast.success("Coupon applied successfully!");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      toast.error("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          address_1: formData.streetAddress,
          address_2: formData.apartment,
          city: formData.city,
          state: formData.province,
          postcode: formData.postalCode,
          country: formData.country,
          email: formData.email,
        },
        line_items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        payment_method: paymentMethod,
        payment_method_title: paymentMethod === "paypal" ? "PayPal" : "Credit Card",
      };

      const result = await apiClient.createOrder(orderData);
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/order-confirmation/${result.order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = totalPrice;
  const finalTotal = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Cart Table */}
        <div className="bg-[#1a2b4d] rounded-lg overflow-hidden mb-8">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-white font-semibold">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>

          {items.length === 0 ? (
            <div className="p-12 text-center text-white/60">
              Your cart is empty. <a href="/shop" className="text-blue-400 hover:underline">Continue shopping</a>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product_id}-${item.license}`}
                className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 items-center"
              >
                <div className="col-span-6 flex items-center gap-4">
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="text-white/60 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {item.image && (
                    <div className="w-20 h-20 relative rounded overflow-hidden bg-gray-800">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white/60 text-sm">{item.license}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center text-white">${item.price}</div>
                <div className="col-span-2 text-center">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product_id, Number.parseInt(e.target.value))}
                    className="w-20 mx-auto bg-[#0f1724] border-white/10 text-white text-center"
                  />
                </div>
                <div className="col-span-2 text-center text-white font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-8">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                UPDATE CART
              </Button>
              <div className="text-white/60 text-sm">
                Returning customer? <a href="/login" className="text-blue-400 hover:underline">LOGIN NOW</a>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Billing Details */}
                <div className="lg:col-span-2">
                  <Card className="bg-[#1a2b4d] border-white/10 p-6">
                    <h2 className="text-white text-xl font-semibold mb-6">Billing details</h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-white mb-2 block">
                            First name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-[#0f1724] border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white mb-2 block">
                            Last name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-[#0f1724] border-white/10 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-white mb-2 block">
                          Company name (optional)
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-white mb-2 block">
                          Country / Region <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => handleInputChange("country", value)}
                          required
                        >
                          <SelectTrigger className="bg-[#0f1724] border-white/10 text-white">
                            <SelectValue placeholder="Select a country / region..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="streetAddress" className="text-white mb-2 block">
                          Street address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="streetAddress"
                          placeholder="House number and street name"
                          required
                          value={formData.streetAddress}
                          onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Input
                          id="apartment"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          value={formData.apartment}
                          onChange={(e) => handleInputChange("apartment", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-white mb-2 block">
                          Town / City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="province" className="text-white mb-2 block">
                          Province <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.province}
                          onValueChange={(value) => handleInputChange("province", value)}
                          required
                        >
                          <SelectTrigger className="bg-[#0f1724] border-white/10 text-white">
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="postalCode" className="text-white mb-2 block">
                          Postcode / ZIP <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">
                          Email address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-white text-lg font-semibold mb-4">Additional information</h3>
                      <div>
                        <Label htmlFor="orderNotes" className="text-white mb-2 block">
                          Order notes (optional)
                        </Label>
                        <Textarea
                          id="orderNotes"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          value={formData.orderNotes}
                          onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white min-h-[100px]"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="bg-[#1a2b4d] border-white/10 p-6 sticky top-24">
                    {/* Coupon Code */}
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-[#0f1724] border-white/10 text-white"
                        />
                        <Button
                          type="button"
                          onClick={applyCoupon}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Apply coupon
                        </Button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-500 text-sm mt-2">
                          Coupon "rockvilleversatility5" applied: -${discount.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <h3 className="text-white font-semibold">Product</h3>
                      {items.map((item) => (
                        <div
                          key={`${item.product_id}-${item.license}`}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-white/80">
                            {item.name} - {item.license} × {item.quantity}
                          </span>
                          <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                      <div className="flex justify-between text-white">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-red-400">
                          <span>Coupon: specialrockvilleversatility5</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#0f1724]">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="text-white flex-1 cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <p className="text-white/60 text-xs px-3 py-2">
                        Our one-click checkout solution lets you use PayPal, Venmo, Pay Later options, and more to help maximize conversion.
                      </p>

                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#0f1724]">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="text-white flex-1 cursor-pointer">
                          Pay With Credit Cards
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-start gap-2 mb-6">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-white/80 text-sm cursor-pointer">
                        I have read and agree to the website{" "}
                        <a href="/terms" className="text-red-500 hover:underline">
                          terms and conditions
                        </a>{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !agreedToTerms}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    >
                      {loading ? "Processing..." : `Pay with ${paymentMethod === "paypal" ? "PayPal" : "Credit Card"}`}
                    </Button>
                  </Card>
                </div>
              </div>
            </form>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
