import mongoose, { Document, Model, Schema } from "mongoose";

// TANIM => Kodda product ne alanları içeriyor?
export interface IProduct extends Document
{
    name: string;
    price: number;
    description: string;
    stock: number;
    image:string;
}

// DB seviyesinde Product'ın şeması?
const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {type:String,required:true, minlength:2},
        price: {type:Number, required:true, min:0},
        description: {type:String, required:false},
        stock: {type:Number, required:true, min:0},
        image:{type:String,required:false},
    },
    {timestamps:true} //TODO: Üzerine konuşulacak
    // Bu ayar sayesinde MongoDB her ürün dökümanına createdAt ve updatedAt alanlarını otomatik olarak ekler.
);

// Tüm sistemde bu şema-tanım bağlantısının kullanılacağı değişken.
export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)