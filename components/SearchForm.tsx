"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { scrapeAndStore } from "@/lib/actions";
import Image from "next/image";

const verifyAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("amazon.")) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

type Product = {
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
};

const SearchForm = () => {
  //state setters
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState<Product | null | undefined>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUrl = verifyAmazonUrl(search);

    if (!isValidUrl) {
      setError("Please enter a valid Amazon URL");
      return;
    }

    try {
      setLoading(true);
      const product = await scrapeAndStore(search);
      setProduct(product);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  console.log(product);
  return (
    <form onSubmit={handleSubmit}>
      <Input onChange={(e) => setSearch(e.target.value)} type="input" />
      {error !== "" && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={search === ""}>
        {loading ? "Loading..." : "Search"}
      </Button>
      {product && <img src={product.imageUrl} alt={product.title} />}
    </form>
  );
};

export default SearchForm;
