const express = require("express");
const filesRoute = require("./filesRouter");

const router = express.Router();

router.use("/dna", filesRoute);

module.exports = router;
