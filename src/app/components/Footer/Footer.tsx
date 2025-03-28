import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FooterProps {
  companyInfo: { name: string; aboutLink: string; contactLink: string };
  social: { linkedin: string; instagram: string };

  legalLinks: {
    privacyPolicy: string;
    termsOfUse: string;
    returnPolicy: string;
  };
}

export default function Footer(props: FooterProps) {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12 mx-auto w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg mb-2">E-ticaret</h3>
              <ul className="text-sm">
                <li>
                  <Link
                    className="hover:text-blue-600"
                    href={props.companyInfo.aboutLink}
                  >
                    AboutUs
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-600"
                    href={props.companyInfo.contactLink}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-lg mb-2 ml-8">Bizi takip edin</h3>
              <div className="flex gap-4">
                <Button
                  variant="link"
                  className="text-white hover:text-blue-700"
                >
                  <Link href={props.social.linkedin}>Linkedin</Link>
                </Button>
                <Button
                  variant="link"
                  className="text-white hover:text-blue-700"
                >
                  <Link href={props.social.instagram}>Instagram</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-lg mb-2">Yasal</h3>
              <ul className="text-sm">
                <li>
                  <Link
                    href={props.legalLinks.privacyPolicy}
                    className="hover:text-blue-400"
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link
                    href={props.legalLinks.termsOfUse}
                    className="hover:text-blue-400"
                  >
                    Kullanım Şartları
                  </Link>
                </li>
                <li>
                  <Link
                    href={props.legalLinks.returnPolicy}
                    className="hover:text-blue-400"
                  >
                    İade Politikası
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm">
            <p>
              © 2025 {props.companyInfo.name} | Kaan Pey Tüm Hakları Saklıdır
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
