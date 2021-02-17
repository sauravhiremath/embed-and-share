const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    req.fileValidationError = "Wrong mimetype. Not a PDF File";
    return cb(null, false, new Error("Wrong mimetype. Not a PDF File"));
  }
  cb(null, true);
};

module.exports = {
  pdfFileFilter,
};
