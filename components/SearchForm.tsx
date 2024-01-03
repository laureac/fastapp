"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { scrapeAndStore } from "@/lib/actions";
import { Product } from "@/types/types";

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

type SearchFormProps = {
  setProduct: React.Dispatch<React.SetStateAction<Product | null | undefined>>;
};

const SearchForm: React.FC<SearchFormProps> = ({ setProduct }) => {
  //state setters
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto">
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="input"
        placeholder="Type something..."
        value={search}
      />
      {error !== "" && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={search === ""} className="ml-4 w-60">
        {loading ? "Loading..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchForm;
