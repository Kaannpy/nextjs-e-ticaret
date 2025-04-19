

import { Product } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url); // urldena parametriyi aldık
    const name = searchParams.get("name")?.toLowerCase();  // name parametresini çektik

    let products;
    if (name) {
      products = await Product.find({
        name: { $regex: name, $options: "i" }, // i lower-capital uyumszulgu için
      });
    } else {
      products = await Product.find();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Veriler alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json(); // gelen veriyi json seklinde aldık
    const addedProduct = await Product.create(body); // ve producta attık db deki

    return NextResponse.json(addedProduct, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Ürün eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
