"use client";
import React, { useState, FormEvent, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormData = {
  telegram: string;
  price: number;
  url: string;
  title: string;
  currency: string;
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
  const [currency, setCurrency] = useState("USD");
  const [titleForm, setTitleForm] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrors({});
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      telegram: HTMLInputElement;
      link: HTMLInputElement;
    };

    const telegram = formElements.telegram.value;
    const link = formElements.link.value;

    if (!telegram || !price || !link || !titleForm || !currency || !turnstileToken) {
      setErrors({ form: "Please fill in all fields, including verification." });
      return;
    }

    setIsSubmitting(true);

    const payload: FormData = {
      telegram,
      price: parseFloat(price),
      url: link,
      title: titleForm,
      currency,
      turnstileToken,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(Object.fromEntries(Object.entries(data.errors).map(([key, messages]) => [key, messages[0]])));
        } else {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        return;
      }

      if (data.redirectUrl) {
        window.location.href = "/checkout/" + data.redirectUrl;
      } else {
        console.error("No redirect URL provided");
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrors({ form: "Failed to submit order. Please try again." });
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
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setPrice(data.product.price?.toString() || "");
      setTitleForm(data.product.name || "");
      setCurrency(data.product.currency || "USD");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query, handleSearch]);
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}

      <div className="space-y-1">
        <div className="relative w-full h-full overflow-visible">
          {loading ? <Loader2 className="animate-spin pointer-events-none absolute top-4 right-4 inset-y-0 h-4 w-4 text-muted-foreground" /> : <Link strokeWidth={2} className="pointer-events-none absolute top-4 right-4 inset-y-0 h-4 w-4 text-muted-foreground" aria-hidden="true" />}
          <Input name="link" type="url" placeholder="Product link" value={query} onChange={(event) => setQuery(event.target.value)} required className={`pr-10 ${errors.link ? "border-red-500" : ""}`} />
        </div>
        {errors.link && <div className="text-red-500 text-sm">{errors.link}</div>}
      </div>
      <div className="space-y-1">
        <Input name="telegram" type="text" placeholder="Telegram username" required className={errors.telegram ? "border-red-500" : ""} />
        {errors.telegram && <div className="text-red-500 text-sm">{errors.telegram}</div>}
      </div>

      <div className="space-y-1">
        <Input name="title" type="text" placeholder="Product title" value={titleForm} onChange={(event) => setTitleForm(event.target.value)} required className={errors.title ? "border-red-500" : ""} />
        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
      </div>

      <div className="flex space-x-2">
        <div className="flex-1 space-y-1">
          <Input name="price" type="number" placeholder="Product price" value={price} onChange={(event) => setPrice(event.target.value)} min="0.01" step="0.01" required className={errors.price ? "border-red-500" : ""} />
          {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
        </div>

        <div className="w-32 space-y-1">
          <Select value={currency} onValueChange={setCurrency} required>
            <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
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
          {errors.currency && <div className="text-red-500 text-sm">{errors.currency}</div>}
        </div>
      </div>

      <Turnstile siteKey={process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "0x4AAAAAAAIdSlK2oYYsGQpg"} onSuccess={(token: string) => setTurnstileToken(token)} onError={() => setTurnstileToken(null)} onExpire={() => setTurnstileToken(null)} />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin pointer-events-none h-5 w-5 text-muted-foreground" /> : "Buy"}
      </Button>
    </form>
  );
}
