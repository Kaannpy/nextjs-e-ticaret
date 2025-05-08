import { describe } from "node:test";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const product = [
    {
      image:
        "https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/myng3tua-iphone-16-pro-128gb-natural-titanium-638617386283887185.jpg",
      title: "Iphone 15 pro",
      description: "Şuan indirimde",
      price: "77.000 TL",
      badge: "İndirimli",
    },

    {
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      title: "Airpods pro",
      description: "Fırsat ürünü",
      price: "15.000 TL",
    },
    {
      image:
        "https://www.notebookcheck-tr.com/fileadmin/_processed_/3/f/csm_IMG_7593_a97c65292f.jpg",
      title: "Macbook Pro",
      description: "",
      price: "75.000 TL",
    },
    {
      image:
        "https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/myng3tua-iphone-16-pro-128gb-natural-titanium-638617386283887185.jpg",
      title: "Iphone 15 pro",
      description: "Şuan indirimde",
      price: "77.000 TL",
      badge: "İndirimli",
    },
    {
      image:
        "https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/myng3tua-iphone-16-pro-128gb-natural-titanium-638617386283887185.jpg",
      title: "Iphone 15 pro",
      description: "Şuan indirimde",
      price: "77.000 TL",
      badge: "İndirimli",
    },
    {
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      title: "Airpods pro",
      description: "Fırsat ürünü",
      price: "15.000 TL",
    },
    {
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      title: "Airpods pro",
      description: "Fırsat ürünü",
      price: "15.000 TL",
    },
    {
      image:
        "https://www.notebookcheck-tr.com/fileadmin/_processed_/3/f/csm_IMG_7593_a97c65292f.jpg",
      title: "Macbook Pro",
      description: "",
      price: "75.000 TL",
    },

    {
      image:
        "https://res.cloudinary.com/dmgqswsdv/image/upload/v1746093896/products/qqcmklwwmns8fxsrv4rx.jpg",
      title: "kaan pey",
      description: "yakısıklı",
      price: "pahabiçilemez",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
        {product.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </>
  );
}
