import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AboutUsProp {
  companyName: string;
  companyDescripiton: string;
  mission: string;
  vision: string;
  social: { linkedin: string; instagram: string };
}

export default function AboutUs(props: AboutUsProp) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        
        <h1 className="text-3xl font-bold mb-4 text-center text-green-700">
          About us{" "}
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-center text-blue-700 ">
            {props.companyName}
          </h2>
          <p className="text-lg">{props.companyDescripiton}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-red-500">Misyonumuz</h2>
          <p className="text-lg">{props.mission}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-red-500">Vizyonumuz</h2>
          <p className="text-lg">{props.vision}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Bizi takip edin !!</h2>
          <div className="flex gap-4 justify-center">
            <Button className="text-red-700 hover:text-blue-700" variant="link">
              <Link href={props.social.linkedin} target="_blank">
                Linkedin{" "}
              </Link>
            </Button>

            <Button className="text-red-700 hover:text-blue-700" variant="link">
              <Link href={props.social.instagram} target="_blank">
                Instagram
              </Link>
            </Button>
          </div>
        </section>

        <div className="text-center">
          <Button variant="outline">
            <Link href="http://localhost:3000/">Anasayfa Dön</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
