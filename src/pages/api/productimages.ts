import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary, { UploadApiResponse } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer bellekte geçici depolama kullanıyor
const upload = multer({ storage: multer.memoryStorage() });  // RAM'de buffer olarak tutuyoruz, doğrudan Cloudinary'ye göndereceğiz

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
handler.use(upload.single("file"));  // Bu, sadece tek dosya yüklemeye izin verir, field adı 'file' olmalı

// Fotoğrafı Cloudinary'ye yükleyip URL'yi döndüren ve ürünü ekleyen POST işlemi
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
      // Cloudinary'ye fotoğrafı yükleme
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "products" },  // Fotoğrafın yükleneceği klasör adı
          (error, result) => {
            if (error) {
              reject(error); // Yükleme sırasında hata oluşursa reject edilir
            } else {
              if (result) {
                resolve(result); // Yükleme başarılı olursa result döndürülür
              } else {
                reject(new Error("Cloudinary yükleme sonucu undefined döndü")); // Hata durumunda reject
              }
            }
          }
        );

        // Multer'ın buffer'ını stream'e dönüştürüp Cloudinary'ye gönderiyoruz
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      // Cloudinary'den dönen güvenli URL
      const imageUrl = result.secure_url;  // Fotoğrafın URL'si

      return res.status(200).json({ message: "Yüklendi", imageUrl });
    } catch (error) {
      console.error("Yükleme hatası:", error);
      return res.status(500).json({ error: "Yükleme başarısız oldu" });
    }
  }
);

// Multer ile çalışmak için bodyParser'ı kapatıyoruz
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
