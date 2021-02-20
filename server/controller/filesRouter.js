const router = require("express").Router();
const consola = require("consola");
const hasha = require("hasha");
const { v4 } = require("uuid");
const Multer = require("multer");
const TypingDnaClient = require("typingdnaclient");
const Minizip = require("minizip-asm.js");

const { TYPINGDNA_API_KEY, TYPINGDNA_API_SECRET } = require("../env");

const typingDnaClient = new TypingDnaClient(
  TYPINGDNA_API_KEY,
  TYPINGDNA_API_SECRET
);

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 10mb
  },
});

router.post("/send", upload.array("docs", 12), async (req, res) => {
  const { body, files } = req;

  for (const file of files) {
    consola.info(file.originalname);
  }

  if (files.length <= 0) {
    return res
      .status(400)
      .json({ error: "No files uploaded. Kindly try again" });
  }

  try {
    const { password, typingPattern } = body;
    const userId = v4();

    if (!typingPattern) {
      return res.status(400).json({
        success: false,
        error: "No typing pattern present. Avoid copy paste of the text",
      });
    }

    typingDnaClient.auto(userId, typingPattern, (err, response) => {
      if (err) {
        consola.warn(err);
        return res.status(500).json({
          success: false,
          error: err,
          data: "Internal Server Erorr. Please try again",
        });
      } else {
        if (response.statusCode !== 200) {
          return res.status(response.statusCode).json({
            name: response.name,
            message: response.message,
          });
        }

        consola.info("signed up userId: ", userId);

        const mz = new Minizip();
        let hashes = "";
        for (const file of files) {
          if (password) {
            mz.append(file.originalname, file.buffer, {
              password,
              compressLevel: 5,
            });
            hashes += "\n";
            hashes += hasha(file.buffer);
          } else {
            mz.append(file.originalname, file.buffer, {
              compressLevel: 5,
            });
            hashes += "\n";
            hashes += hasha(file.buffer);
          }
        }

        const verificationToken = `${userId}\n${typingPattern}\n${hashes}`;
        mz.append("verify-token.txt", Buffer.from(verificationToken, "utf-8"));
        mz.append(
          "tokenHash.txt",
          Buffer.from(hasha(verificationToken), "utf-8")
        );

        res.status(200).json({
          success: true,
          typingPattern,
          signedFile: mz.zip(),
          typingDNAResponse: response,
          message: "Typing pattern successfully embedded in the documents!",
        });
      }
    });
  } catch (error) {
    consola.error(error);
    res
      .status(500)
      .send({ success: false, error, message: "internal error occured" });
  }
});

router.post("/verify", upload.single("zipFile"), async (req, res) => {
  const { body, file } = req;

  if (!file) {
    return res
      .status(400)
      .json({ error: "No zip file uploaded. Kindly try again" });
  }

  if (file.mimetype !== "application/zip") {
    consola.warn("Uploaded wrong file with mimetype: ", file.mimetype);
    return res.status(400).json({
      error: "Wrong file type! Kindly upload a signed zip file",
    });
  }

  try {
    const { typingPattern } = body;

    if (!typingPattern) {
      return res.status(400).json({
        success: false,
        error: "No typing pattern present. Avoid copy paste of the text",
      });
    }

    const mz = new Minizip(file.buffer);
    let verificationToken = "";
    let oldHash = "";
    let newHash = "";

    for (const { filepath, crypt } of mz.list()) {
      if (filepath === "verify-token.txt") {
        const extractedFile = mz.extract(filepath);
        newHash = hasha(extractedFile);
        verificationToken = extractedFile.toString();
      }
      if (filepath === "tokenHash.txt") {
        const extractedFile = mz.extract(filepath);
        oldHash = extractedFile.toString();
      }
    }

    const tokens = verificationToken
      .split("\n")
      .filter((ele) => ele.trim() != "");
    const [userId, oldTypingPattern, hashes] = tokens;

    consola.info("verifying for userId: ", userId);

    const isShaVerified = oldHash === newHash;

    typingDnaClient.auto(userId, typingPattern, (error, response) => {
      if (error) {
        consola.warn(error);
        return res.status(500).json({
          success: false,
          error,
        });
      } else {
        consola.info(JSON.stringify(response));
        if (response.statusCode !== 200) {
          return res.status(response.statusCode).json({
            name: response.name,
            message: response.message,
          });
        }

        res.status(200).json({
          success: true,
          typingPattern,
          typingDNAResponse: response,
          isVerified: isShaVerified,
          message: "Signed-zip file verification is complete!",
        });
      }
    });
  } catch (error) {
    consola.error(error);
    res
      .status(500)
      .send({ success: false, error, message: "internal error occured" });
  }
});

module.exports = router;
