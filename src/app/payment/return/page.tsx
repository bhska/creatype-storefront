"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get payment status from URL params
    // In production, verify with payment gateway
    const paymentStatus = searchParams.get("status");
    const orderParam = searchParams.get("order");
    const token = searchParams.get("token"); // PayPal token
    const payerId = searchParams.get("PayerID"); // PayPal payer ID

    // Simulate payment verification
    // In production, you'd verify with payment gateway API
    const verifyPayment = async () => {
      // Set order ID from params
      if (orderParam) {
        setOrderId(orderParam);
      }

      // Wait for payment verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Determine payment status
      if (paymentStatus === "success" || token) {
        setStatus("success");
      } else if (paymentStatus === "cancelled" || paymentStatus === "failed") {
        setStatus("failed");
      } else {
        // Default to success if payment was completed
        setStatus(token ? "success" : "failed");
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-[#1a2b4d] border-white/10 p-8">
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                <h1 className="text-white text-2xl font-bold mb-2">Processing Payment...</h1>
                <p className="text-white/60">Please wait while we verify your payment</p>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-[#1a2b4d] border-white/10 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-white text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-white/60 mb-6">
                  Thank you for your purchase. Your payment has been processed successfully.
                </p>

                {orderId && (
                  <div className="bg-[#0f1724] rounded-lg p-4 mb-6">
                    <p className="text-white/80 text-sm mb-1">Order Number</p>
                    <p className="text-white font-semibold text-lg">#{orderId}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {orderId && (
                    <Button
                      onClick={() => router.push(`/order-confirmation/${orderId}`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      View Order Details
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>

                <p className="text-white/60 text-sm mt-6">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Failed status
  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-[#1a2b4d] border-white/10 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Payment Failed</h1>
              <p className="text-white/60 mb-6">
                Unfortunately, we couldn't process your payment. Please try again or contact support if the problem persists.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Try Again
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Link href="/shop">Back to Shop</Link>
                </Button>
              </div>

              <p className="text-white/60 text-sm mt-6">
                Need help? Contact us at{" "}
                <a href="mailto:support@creatype.com" className="text-blue-400 hover:underline">
                  support@creatype.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f1724]">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-[#1a2b4d] border-white/10 p-8">
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                <h1 className="text-white text-2xl font-bold mb-2">Loading...</h1>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}
