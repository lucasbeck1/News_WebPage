import { Request, Response } from "express";
import multer from "multer";
import path from "path";

// ------------------------------------------------------------------

export const getOneImage = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const filePath = path.join(__dirname, "../", "uploads", name);
    return res.sendFile(filePath);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

// Mimetypes: npm package that can obtain the extension of the file
// import mimeTypes from "mime-types"
// const fileName = date.toISOString() + "_" + mimeTypes.extension(file.mimetype);

export const uploadImage = async (req: Request, res: Response) => {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (_req, file, cb) => {
      const date = new Date();
      const fileName = date.toISOString() + "_" + file.originalname;
      cb(null, fileName);
    },
  });

  const uploadOptions = multer({
    storage,
    limits: { fileSize: 10000000 },
  }).single("image");

  uploadOptions(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
    //console.log(req.file);
    return res
      .status(200)
      .json({ message: "Upload Ok", fileName: req.file?.filename });
  });
};
