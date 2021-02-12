require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const consola = require("consola");
const helmet = require("helmet");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.disable("x-powered-by");

app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.send(`Ping test working - ${Date.now()}`);
});

// throws error if API not listed above
app.use((req, res, next) => {
  const error = new Error("API endpoint is not valid");
  error.status = 400;
  res.status(error);
});

app.listen(8080, () => {
  consola.success("server is live on http://localhost:8080");
});
