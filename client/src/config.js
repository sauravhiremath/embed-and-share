let BASE_URL = "http://localhost:8080";

if (process.env.NODE_ENV === "production") {
  BASE_URL =
    "https://embed-and-share-api-dot-eastern-surface-293816.el.r.appspot.com";
}

module.exports = BASE_URL;
