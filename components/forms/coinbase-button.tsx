"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CoinbaseButtonProps {
  orderId: string;
}

const CoinbaseButton: React.FC<CoinbaseButtonProps> = ({ orderId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL provided");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handlePayment}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Processing..." : "Pay with Coinbase"}
    </Button>
  );
};

export default CoinbaseButton;
