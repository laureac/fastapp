"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { scrapeAndStore } from "@/lib/actions";

const verifyAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname.includes("amazon.") ||
      parsedUrl.hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

const SearchForm = () => {
  //state setters
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUrl = verifyAmazonUrl(search);

    if (!isValidUrl) {
      alert("Please enter a valid Amazon URL");
    }

    try {
      setLoading(true);
      const product = await scrapeAndStore(search);
      console.log(product);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input onChange={(e) => setSearch(e.target.value)} type="input" />
      <Button type="submit" disabled={search === ""}>
        {loading ? "Loading..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchForm;
