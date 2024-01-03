import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

export async function scrapeAmazonPdt(productUrl: string) {
  if (!productUrl) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PWD);
  const port = 22225;
  const seesionId = Math.floor(Math.random() * 5000);
  const options = {
    auth: {
      username: `${username}-session-${seesionId}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(productUrl, options);
    console.log(response.data);

    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const price = extractPrice(
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const image = $("#landingImage").attr("data-a-dynamic-image") || "{}";
    const imageUrls = Object.keys(JSON.parse(image))[0];

    const data = {
      price: Number(price),
      title,
      imageUrls,
    };

    console.log(data);
    return data;
  } catch (e: any) {
    throw new Error(`Error scraping: ${e.message}`);
  }
}
