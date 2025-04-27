import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

// Cloudinary yapılandırması
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer bellekte geçici depolama kullanıyor
const upload = multer({ storage: multer.memoryStorage() });  // RAMDE buffer olarak tutuyoruz direk cloudinary yollicaz zaten

// API route handler
const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse,
    next: (err?: any) => void
  ) => {
    console.error("API Error:", err);
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: "Method izin verilmiyor" });
  },
});

// Multer middleware (tek dosya, field adı: file)
handler.use(upload.single("file"));

// Tip genişletilerek multer dosyasını kabul edecek şekilde
handler.post(
  async (
    req: NextApiRequest & { file: Express.Multer.File },
    res: NextApiResponse
  ) => {
    console.log("POST isteği alındı", req.file ? "Dosya var" : "Dosya yok");

    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenmedi" });
    }

    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      return res.status(200).json({ message: "Yüklendi", result });
    } catch (error) {
      console.error("Yükleme hatası:", error);
      return res.status(500).json({ error: "Yükleme başarısız oldu" });
    }
  }
);

// Multer ile çalışmak için bodyParser kapatılıyor
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
