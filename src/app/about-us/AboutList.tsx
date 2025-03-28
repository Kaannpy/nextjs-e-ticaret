import AboutUs from "./AboutUs";

export default function AboutList() {
  const companyInfo = {
    companyName: "E-ticaret",
    companyDescription:
      " 2025 yılında kuruldu ve kısa sürede sektörde lider hale geldi. Müşteri memnuniyetini ön planda tutarak kaliteli ürünler ve hızlı teslimat garantisi ile hizmet veriyoruz.",
    mission:
      "Müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla sunarak, kusursuz bir alışveriş deneyimi sağlamak.",
    vision:
      "Dünya çapında tanınan, müşteri odaklı ve inovatif bir e-ticaret markası olmak.",
    social: {
      linkedin: "https://www.linkedin.com/in/kaanpey/",
      instagram: "https://www.instagram.com/accounts/login/",
    },
  };

  return (
    <>
      <div>
        <AboutUs companyDescripiton={""} {...companyInfo} />
      </div>
    </>
  );
}
