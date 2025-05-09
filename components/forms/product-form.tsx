"use client";
import React, { useState, useEffect, useCallback, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("HomePage");
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
    if (query) {
      setFormData((prev) => ({
        ...prev,
        url: query,
      }));
      handleSearch();
    }
  }, [query, handleSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="md:max-w-[400px] flex flex-col space-y-6">
        {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}
        <div className="flex flex-col space-y-3 rounded-xl">
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">{t("product-heading")}</h2>
            <div className="relative">
              {loading ? <Loader2 className="animate-spin absolute top-5 right-4 h-4 w-4 text-muted-foreground" /> : <Link className="absolute top-5 right-4 h-4 w-4 text-muted-foreground" />}
              <Input
                name="url"
                type="url"
                placeholder={t("input-link")}
                value={formData.url}
                onChange={(e) => {
                  handleChange(e);
                  setQuery(e.target.value);
                }}
                required
                className="pr-10"
              />
            </div>
          </div>

          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">{t("contact-heading")}</h2>
            <Input name="email" type="email" placeholder={t("input-email")} value={formData.email} onChange={handleChange} required />
          </div>
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">{t("details-heading")}</h2>
            <div className="flex flex-col space-y-3">
              <Input name="title" type="text" placeholder={t("input-title")} value={formData.title} onChange={handleChange} required />
              <div className="flex space-x-2">
                <Input name="price" type="number" placeholder={t("input-price")} value={formData.price} onChange={handleChange} required />

                <Select value={formData.currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("input-currency")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="SGD">SGD</SelectItem>
                      <SelectItem value="SEK">SEK</SelectItem>
                      <SelectItem value="PLN">PLN</SelectItem>
                      <SelectItem value="RUB">RUB</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="BRL">BRL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:space-y-1">
            <h2 className="text-sm/6 font-medium text-foreground hidden md:block">{t("shipping-heading")}</h2>
            <div className="flex flex-col space-y-3">
              <Input name="name" type="text" placeholder={t("input-name")} value={formData.name} onChange={handleChange} required />
              <Input name="address" type="text" placeholder={t("input-address")} value={formData.address} onChange={handleChange} required />
              <div className="flex space-x-2">
                <Input name="city" type="text" placeholder={t("input-city")} value={formData.city} onChange={handleChange} required />
                <Input name="zip" type="text" placeholder={t("input-postcode")} value={formData.zip} onChange={handleChange} required />
              </div>
              <div className="w-full">
                <Select value={formData.country} onValueChange={handleCountryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("input-country")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Belgium">Belgium</SelectItem>
                      <SelectItem value="Switzerland">Switzerland</SelectItem>
                      <SelectItem value="Sweden">Sweden</SelectItem>
                      <SelectItem value="Finland">Finland</SelectItem>
                      <SelectItem value="Poland">Poland</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                      <SelectItem value="Russia">Russia</SelectItem>
                      <SelectItem value="China">China</SelectItem>
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

        <Button type="submit" className="w-full md:w-32 h-[56px] rounded-full font-medium tracking-tight text-base" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : t("button-shop")}
        </Button>
      </div>
    </form>
  );
}
