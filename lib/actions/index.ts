"use server";

import { scrapeAmazonPdt } from "../scrape";

export async function scrapeAndStore(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonPdt(productUrl);
    if (!scrapedProduct) return;
    return scrapedProduct;
  } catch (e: any) {
    throw new Error(`Error scraping: ${e.message}`);
  }
}
