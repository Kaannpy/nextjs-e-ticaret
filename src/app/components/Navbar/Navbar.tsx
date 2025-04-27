"use client";
import { Button } from "@/components/ui/button";
import { Ghost, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation"; // App Router kullanıyorsak

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const [mobileMenuOpen, setmobileMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setmobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // tip guvenliğği için bu kadar uzun yazdık any de diyebilirdik ama type güvenliği ortadan kalkardı
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Formun varsayılan davranışı sayfayı yenilemekti. Bu satır bunu engelliyor.
    if (searchQuery) {
      router.push(`/products/search?name=${searchQuery}`);
    }
  };
  return (
    <>
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container flex items-center h-16 mx-auto px-4 justify-between">
          <Link
            className="font-semibold text-xl hover:border-b  hover:border-red-600"
            href={"/"}
          >
            E-ticaret
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link className="hover:border-b  hover:border-blue-600" href={"/"}>
              Homepage
            </Link>
            <Link
              className="hover:border-b  hover:border-blue-600"
              href={"/about-us"}
            >
              About
            </Link>
            <Link className="hover:border-b  hover:border-blue-600" href={"/"}>
              Products
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex space-x-2">
              <input
                type="text"
                placeholder="search product ..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 p-2 rounded-3xl"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-4xl flex gap-20"
              >
                Search
              </button>
            </form>
          </div>

          <div className="md:hidden">
            <Button
              className="cursor-pointer "
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
            >
              {" "}
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <div
            className={`fixed inset-0 top-16 bg-background z-50 md:hidden ${
              mobileMenuOpen ? "flex flex-col" : "hidden"
            }`}
          >
            <div className="flex flex-col space-y-4 p-6">
              <Link href={"/"}>Homepage</Link>
              <Link href={"/about-us"}>About</Link>
              <Link href={"/"}>Products</Link>
            </div>
          </div>

          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer">Language</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Chose Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Turkish
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
