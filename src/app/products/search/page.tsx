"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/Products/ProductCard"; // Ürün kartlarını render edeceğiniz bileşen

export default function SearchPage() {
  const [query, setQuery] = useState(""); // aramaları almak için
  const [products, setProducts] = useState<any[]>([]); // Ürün listesi
  const [loading, setLoading] = useState(false); // Yüklenme durumu

  useEffect(() => {
    // Arama terimini localStorage'a kaydediyoruz
    const fetchProducts = async () => {
      // window.location.search ile URL'deki parametreyi alıyoruz
      const searchParams = new URLSearchParams(window.location.search);
      const searchTerm = searchParams.get("name") || ""; // 'name' parametresini alıyoruz
      setQuery(searchTerm); // Query parametresini state'e kaydediyoruz

      if (searchTerm.length > 0) {
        setLoading(true); // Yükleniyor durumunu başlatıyoruz
        try {
          const response = await fetch(
            `/api/products/search?name=${searchTerm}`
          );
          const data = await response.json();
          console.log("apiden gelen ürünler", data); // API'den gelen veriyi alıyoruz
          setProducts(data); // Ürünleri state'e kaydediyoruz
        } catch (error) {
          console.error("Arama sırasında hata oluştu:", error);
        } finally {
          setLoading(false); // Yüklenme durumunu bitiriyoruz
        }
      } else {
        setProducts([]); // Arama terimi boşsa ürünleri temizliyoruz
      }
    };

    fetchProducts(); // fetchProducts fonksiyonunu çağırıyoruz
  }, [window.location.search]); // URL değiştiğinde useEffect yeniden çalışacak

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
