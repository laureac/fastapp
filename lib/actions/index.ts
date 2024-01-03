"use server";

import Product from "../models/product.model";
import { connectToDb } from "../mongoose";
import { scrapeAmazonPdt } from "../scrape";
import { revalidatePath } from "next/cache";

export async function scrapeAndStore(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDb();
    const scrapedProduct = await scrapeAmazonPdt(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;

    let existingProduct = await Product.findOne({
      title: scrapedProduct.title,
    });

    if (existingProduct) {
      const updatedPrice = existingProduct.price;

      product = {
        ...scrapedProduct,
        price: updatedPrice,
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        title: scrapedProduct.title,
      },
      product,
      {
        new: true,
        upsert: true,
      }
    );
    revalidatePath(`/products/${newProduct._id}`);
    return newProduct;
  } catch (e: any) {
    throw new Error(`Error scraping: ${e.message}`);
  }
}

export async function getProduct(productId: string) {
  try {
    connectToDb();
    const product = await Product.find({ _id: productId });
    if (!product) return null;
    return product;
  } catch (e: any) {
    throw new Error(`Error getting products: ${e.message}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDb();
    const products = await Product.find({});
    if (!products) return null;
    return products;
  } catch (e: any) {
    throw new Error(`Error getting products: ${e.message}`);
  }
}
