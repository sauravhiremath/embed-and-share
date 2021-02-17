const consola = require("consola");

const { TYPINGDNA_API_KEY, TYPINGDNA_API_SECRET } = process.env;

if (!TYPINGDNA_API_KEY ?? !TYPINGDNA_API_SECRET) {
  consola.warn("Missing key and secret. Kindly add the required .env vars");
}

module.exports = {
  TYPINGDNA_API_KEY,
  TYPINGDNA_API_SECRET,
};
