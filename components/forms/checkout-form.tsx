"use client";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CheckoutData {
  id: string;
  title: string;
  status: boolean;
  currency: string;
}

interface CheckoutFormProps {
  checkoutData: CheckoutData;
}

interface FormData {
  variant: string;
  checkoutId: string;
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

export default function CheckoutForm({ checkoutData }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    variant: "",
    checkoutId: checkoutData.id,
    name: "",
    address: "",
    zip: "",
    city: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const requiredFields: (keyof FormData)[] = ["name", "address", "zip", "city", "country"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = `/payment/${data.redirectUrl}`;
      } else {
        console.error("No redirect URL provided in response");
        alert("Order processed but couldn't proceed to payment. Please contact support.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = [
    { value: "USD", label: "United States" },
    { value: "EUR", label: "France" },
    { value: "GBP", label: "United Kingdom" },
    { value: "PLN", label: "Poland" },
    { value: "SGD", label: "Singapore" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <Label>Shipping details</Label>

      <Input className="hidden" name="variant" type="text" value={formData.variant} onChange={handleInputChange} />
      <Input className="hidden" name="checkoutId" type="text" value={formData.checkoutId} readOnly />
      <Input name="name" type="text" placeholder="Full name" required value={formData.name} onChange={handleInputChange} />
      <Input name="address" type="text" placeholder="Address" required value={formData.address} onChange={handleInputChange} />
      <div className="flex space-x-2">
        <Input name="city" type="text" placeholder="City" required value={formData.city} onChange={handleInputChange} />
        <Input name="zip" type="text" placeholder="Postcode" required value={formData.zip} onChange={handleInputChange} />
      </div>
      <Select value={formData.country} onValueChange={handleCountryChange} required>
        <SelectTrigger>
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {countryOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
}
