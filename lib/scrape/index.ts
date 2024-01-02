import axios from "axios";
import * as cheerio from "cheerio";

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
    console.log(title);
    return title;
  } catch (e: any) {
    throw new Error(`Error scraping: ${e.message}`);
  }
}
