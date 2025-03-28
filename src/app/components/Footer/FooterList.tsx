import Footer from "./Footer";

export default function FooterList() {
  const companyInfo = {
    name: "E-ticaret",
    aboutLink: "/about-us",
    contactLink: "/contact-us",
  };

  const social = {
    linkedin: "https://www.linkedin.com/in/kaanpey/",
    instagram: "https://www.instagram.com/accounts/login/",
  };

  const legal = {
    privacyPolicy: "/gizlilik-politikasi",
    termsOfUse: "/kullanim-sartlari",
    returnPolicy: "/iade-politikasi",
  };

  return (
    <div>
      <Footer companyInfo={companyInfo} social={social} legalLinks={legal} />
    </div>
  );
}
