"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Heart, HeartOff } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
  price: string;
  badge?: string;
}

export default function ProductCard(props: ProductCardProps) {
  const [isfav, setIsFav] = useState<boolean>(false);

  const togglefav = () => {
    setIsFav(!isfav);
    alert(isfav ? "favorilerden kaldırıldı" : "Favorilere eklendi");
  };
  const addBasket = () => {
    alert("Sepete Eklendi");
  };

  return (
    <Card className=" max-w-85 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden max-h-[700px]  relative">
      {props.badge && (
        <Badge
          variant="destructive"
          className="  absolute top-0 right-0 z-20 rounded-pill px-3 py-1 text-sm"
        >
          {props.badge}
        </Badge>
      )}

      <CardHeader className="p-2">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center p-2">
        <img
          src={props.image}
          alt={props.title}
          width={250}
          height={250}
          className="rounded-lg  object-contain"
        />
      </CardContent>

      <CardFooter className="p-3 flex flex-col justify-between items-center mt-auto">
        <div className="flex flex-col justify-between items-center w-full">
          <div className="flex justify-between items-center w-full">
            <span className="font-bold text-lg">{props.price}</span>
          </div>

          <div className="flex gap-2 mt-2 w-full justify-between items-center">
            <Button onClick={addBasket} className="w-1/2">
              Sepete Ekle
            </Button>
            <Button className="w-1/2" variant="outline">
              Ödeme
            </Button>
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              onClick={togglefav}
              className={`${
                !isfav ? "text-gray-500 hover:text-red-500" : "text-red-600"
              } transition-all duration-200`}
            >
              {isfav ? <Heart size={24} /> : <HeartOff size={24} />}
            </Button>
          </div>

          <div className="mt-4 text-sm text-center text-gray-500">
            <p>Ücretsiz Kargo ve İade Garantisi</p>
            <p>
              Sepetinizi kontrol etmek için{" "}
              <a href="/" className="text-blue-600">
                buraya tıklayın
              </a>
              .
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
