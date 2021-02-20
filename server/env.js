const consola = require("consola");
const { CorsOptions } = require("cors");

const { TYPINGDNA_API_KEY, TYPINGDNA_API_SECRET, NODE_ENV } = process.env;

if (!TYPINGDNA_API_KEY || !TYPINGDNA_API_SECRET) {
  consola.warn("Missing key and secret. Kindly add the required .env vars");
}

/** @type CorsOptions */
const corsOptions = { origin: ["http://localhost:3000"] };
if (NODE_ENV === "production") {
  corsOptions.origin = [
    "https://embed.sauravmh.com",
    "https://embed-and-share.vercel.app",
    "https://embed-and-share-git-master.sauravmh.vercel.app",
    "https://embed-and-share.sauravmh.vercel.app",
  ];
}

module.exports = {
  TYPINGDNA_API_KEY,
  TYPINGDNA_API_SECRET,
  corsOptions,
};
