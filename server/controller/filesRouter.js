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

router.post("/send", upload.array("files", 12), async (req, res) => {
  const { body, files } = req;

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

    typingDnaClient.auto(
      userId,
      typingPattern,
      { device: "desktop" },
      (err, response) => {
        if (err) {
          consola.warn(err);
          res.status(500).json({
            success: false,
            error: err,
            data: "Internal Server Erorr. Please try again",
          });
        } else {
          const mz = new Minizip();
          const hashes = "";
          for (const file in files) {
            if (password) {
              mz.append(file.originalname, file.buffer, { password });
              hashes += "/";
              hashes += hasha(file.buffer);
            }
          }

          const verificationToken = `${userId}/${typingPattern}${hashes}`;
          mz.append(
            "verify-token.txt",
            Buffer.from(verificationToken, "utf-8")
          );
          mz.append(
            "tokenHash.txt",
            Buffer.from(hasha(verificationToken), "utf-8")
          );

          res.status(200).json({
            success: true,
            file: mz.zip(),
            typingDNAResponse: response,
            message: "Your files are successfully signed using your typingDNA",
          });
        }
      }
    );
  } catch (error) {
    consola.error(error);
    res
      .status(500)
      .send({ success: false, error, message: "internal error occured" });
  }
});

module.exports = router;
