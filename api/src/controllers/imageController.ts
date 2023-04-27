import { Request, Response } from "express";
import multer from "multer";
import path from "path";

// ------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
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

export const uploadImage = async (req: Request, res: Response) => {
  uploadOptions(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
    console.log(req.file);
    return res
      .status(200)
      .json({ message: "Upload Ok", fileName: req.file?.filename });
  });
};
