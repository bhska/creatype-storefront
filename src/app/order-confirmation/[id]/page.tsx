"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";

interface OrderData {
  id: number;
  status: string;
  date_created: string;
  total: string;
  billing?: {
    first_name: string;
    last_name: string;
    email: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items?: Array<{
    name: string;
    quantity: number;
    total: string;
  }>;
  payment_method_title?: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  async function fetchOrder() {
    setLoading(true);
    try {
      const result = await apiClient.getOrder(Number.parseInt(orderId));
      setOrder(result.order);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-[#1a2b4d] border-white/10 p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-white/10 rounded w-2/3 mx-auto" />
                <div className="h-4 bg-white/10 rounded w-1/2 mx-auto" />
                <div className="h-32 bg-white/10 rounded" />
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-2xl mb-4">Order not found</h1>
            <Button onClick={() => router.push("/shop")} className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.date_created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-white/60">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="bg-[#1a2b4d] border-white/10 p-8 mb-6">
            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
              <div>
                <h3 className="text-white/60 text-sm mb-1">Order Number</h3>
                <p className="text-white font-semibold">#{order.id}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-1">Date</h3>
                <p className="text-white font-semibold">{orderDate}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-1">Total</h3>
                <p className="text-white font-semibold">${order.total}</p>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-1">Payment Method</h3>
                <p className="text-white font-semibold capitalize">{order.payment_method_title || "PayPal"}</p>
              </div>
            </div>

            {/* Order Items */}
            {order.line_items && order.line_items.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold text-lg mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.line_items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
                    >
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">${item.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Information */}
            {order.billing && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Billing Information</h3>
                <div className="text-white/80 space-y-1">
                  <p>
                    {order.billing.first_name} {order.billing.last_name}
                  </p>
                  <p>{order.billing.email}</p>
                  <p>{order.billing.address_1}</p>
                  <p>
                    {order.billing.city}, {order.billing.state} {order.billing.postcode}
                  </p>
                  <p>{order.billing.country}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Download Notice */}
          <Card className="bg-blue-900/20 border-blue-500/30 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Download Your Fonts</h3>
                <p className="text-white/80 text-sm mb-4">
                  A download link has been sent to your email address. You can also access your downloads from your account dashboard.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Go to Downloads
                </Button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Support Notice */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@creatype.com" className="text-blue-400 hover:underline">
                support@creatype.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
