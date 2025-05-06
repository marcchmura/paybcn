"use client";
import React, { useState, useEffect, useCallback, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormData = {
  email: string;
  price: string;
  url: string;
  title: string;
  currency: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  turnstileToken: string;
};

type ApiResponse = {
  status: "success" | "error";
  redirectUrl?: string;
  message?: string;
  errors?: Record<string, string[]>;
};

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    price: "",
    url: "",
    title: "",
    currency: "USD",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    turnstileToken: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      currency: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setErrors({});

    // Simple front-end validation
    const required = ["email", "price", "url", "title", "currency", "name", "address", "city", "zip", "country", "turnstileToken"];
    const missing = required.filter((f) => !formData[f as keyof FormData]);
    if (missing.length > 0) {
      setErrors({ form: `Missing fields: ${missing.join(", ")}` });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        setErrors(data.errors ? Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v[0]])) : { form: data.message || "Unknown error" });
        return;
      }

      if (data.redirectUrl) {
        window.location.href = `/checkout/${data.redirectUrl}`;
      } else {
        setErrors({ form: "Order created but payment redirect failed." });
      }
    } catch (error) {
      console.error("Order error:", error);
      setErrors({ form: "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/swift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: query }),
      });
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        url: query,
        price: data.product.price || 0,
        title: data.product.name || "",
        currency: data.product.currency || "USD",
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query) handleSearch();
  }, [query, handleSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="md:max-w-[400px] flex flex-col space-y-6">
        {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}
        <div className="flex flex-col space-y-3 rounded-xl">
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">Product link</h2>
            <div className="relative">
              {loading ? <Loader2 className="animate-spin absolute top-5 right-4 h-4 w-4 text-muted-foreground" /> : <Link className="absolute top-5 right-4 h-4 w-4 text-muted-foreground" />}
              <Input name="link" type="url" placeholder="Product link" value={query} onChange={(e) => setQuery(e.target.value)} required className="pr-10" />
            </div>
          </div>

          <div className="flex flex-col md:space-y-1">
          <h2 className="text-sm/6 font-medium text-foreground hidden md:block">Contact information</h2>
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">Product details</h2>
            <div className="flex flex-col space-y-3">
            <Input name="title" type="text" placeholder="Product Name" value={formData.title} onChange={handleChange} required />
            <div className="flex space-x-2">
              <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} required />

              <Select value={formData.currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="SGD">SGD</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">Shipping</h2>
            <div className="flex flex-col space-y-3">
            <Input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <Input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <div className="flex space-x-2">
              <Input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} required />
              <Input name="zip" type="text" placeholder="Postcode" value={formData.zip} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <Select value={formData.country} onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            </div>
          </div>

          <Turnstile
            className="hidden"
            siteKey={process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "0x4AAAAAAAIdSlK2oYYsGQpg"}
            onSuccess={(token: string) => setFormData((prev) => ({ ...prev, turnstileToken: token }))}
            onError={() => setFormData((prev) => ({ ...prev, turnstileToken: "" }))}
            onExpire={() => setFormData((prev) => ({ ...prev, turnstileToken: "" }))}
          />
        </div>

        <Button type="submit" className="w-full md:w-32 h-12 rounded-full font-medium tracking-tight text-base" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Shop now"}
        </Button>
      </div>
    </form>
  );
}
