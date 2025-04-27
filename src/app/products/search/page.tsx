"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/Products/ProductCard"; // Ürün kartlarını render edeceğiniz bileşen

export default function SearchPage() {
  const [query, setQuery] = useState(""); // aramaları almak için
  const [products, setProducts] = useState<any[]>([]);

  // [] veriyi tutar ilk değer boş olan 2.si ise değiştiren fonk
  // Ürünlerin tutuyor
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutuyor

  useEffect(() => {
    const fetchProducts = async () => {
      // Ürünleri API'den çekmek için bir async fonksiyon
      const params = new URLSearchParams(); // apple yazdık mesela name=apple oldu
      const searchTerm = params.get("name") || ""; // bu apple aldık
      setQuery(searchTerm); // ve kaydetttik

      if (searchTerm.length > 0) {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/products/search?name=${searchTerm}`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Arama sırasında hata oluştu:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [window.location.search]); //urldeki girdigimiz değeleri güncellemek için  yeni arama oto yapmak

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">Arama Sonuçları</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                badge={product.badge}
              />
            ))
          ) : (
            <p>Sonuç bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
}
