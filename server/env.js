const consola = require("consola");
const { CorsOptions } = require("cors");

const { TYPINGDNA_API_KEY, TYPINGDNA_API_SECRET, NODE_ENV } = process.env;

if (!TYPINGDNA_API_KEY || !TYPINGDNA_API_SECRET) {
  consola.warn("Missing key and secret. Kindly add the required .env vars");
}

let HOST = "http://localhost:3000";

/** @type CorsOptions */
const CORS_OPTIONS = { origin: ["http://localhost:3000"] };
if (NODE_ENV === "production") {
  CORS_OPTIONS.origin = [
    "https://embed.sauravmh.com",
    "https://embed-and-share.vercel.app",
    "https://embed-and-share-git-master.sauravmh.vercel.app",
    "https://embed-and-share.sauravmh.vercel.app",
  ];
  HOST = "https://embed.sauravmh.com";
}

module.exports = {
  TYPINGDNA_API_KEY,
  TYPINGDNA_API_SECRET,
  HOST,
  CORS_OPTIONS,
};
