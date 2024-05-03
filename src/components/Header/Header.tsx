"use client";

import React, { useContext, useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { FaRegMoon, FaWallet } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MaxWidthWrapper from "../MaxWidthWrapper";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import ProfileButton from "../ProfileButton";
import { Separator } from "../ui/separator";
import { useUser } from "@/store/useUser";
import Navbar from "./Navbar";
import Cart from "../Cart";
import categoryApi from "@/apis/categoryApi";
import { useCategory } from "@/store/useCategory";
import { useCart } from "@/store/useCart";
import images from "@/img";
import routes from "@/routes";
import SearchInput from "../Input/SearchInput";
import Image from "next/image";
import { AppContext } from "@/context/app-context";

export interface Navigation {
  href: string;
  label: string;
  icon: string;
  name: string;
}

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { baseCategoryInfo } = useCategory();
  // const { userInfo, isLogined } = useUser();
  const { cartProducts, setQty } = useCart();
  const { connectWallet, walletAddress, isConnected, user } =
    useContext(AppContext);

  useEffect(() => {
    setQty(cartProducts.length);
  }, [cartProducts]);

  const categories: Navigation[] | undefined = baseCategoryInfo?.map(
    (category) => {
      return {
        href: category.id,
        label: category.name,
        icon: category?.iconUrl?.imageUrl,
        name: category.name,
      };
    }
  );

  categories?.unshift({
    href: "/",
    label: "All",
    icon: "",
    name: "All",
  });

  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="sticky z-50 top-0 inset-x-0 dark:bg-[#111827] bg-white">
        <MaxWidthWrapper>
          <div className="relative  flex h-16 items-center justify-between w-full">
            <div className="flex items-center justify-between">
              {/* <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 lg:hidden w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {categories?.map((category, i) => (
                      <Link
                        key={i}
                        href={category.href}
                        className="block px-2 py-1 text-lg font-bold"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet> */}
              <Link href="/" className="ml-4 lg:ml-0">
                <Image
                  src={images.logo}
                  alt="footer logo"
                  height={100}
                  width={100}
                />
              </Link>
            </div>

            <SearchInput />

            <div className="flex items-center gap-3">
              <div className="hidden md:flex h-full justify-center items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <IoSunnyOutline className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <FaRegMoon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>

                {user ? (
                  <>
                    {isConnected ? (
                      <Button
                        className="rounded-full"
                        onClick={() => router.push(routes.upload)}
                      >
                        Create
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => connectWallet()}
                      >
                        Connect
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="hidden md:flex h-full justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => router.push(routes.register)}
                    >
                      Register
                    </Button>
                    <Separator orientation="vertical" className="h-10" />
                    <Button
                      onClick={() => router.push(routes.login)}
                      className="rounded-full"
                    >
                      <FaWallet />
                      <p className="ml-3">Login</p>
                    </Button>
                  </div>
                )}

                {/* {isConnected ? (
                  <Button
                    className="rounded-full"
                    onClick={() => router.push(routes.upload)}
                  >
                    Create
                  </Button>
                ) : (
                  <></>
                )} */}
              </div>

              {/* <div className="hidden md:flex h-full justify-center items-center">
                {userInfo ? (
                  <>
                    <ProfileButton />
                  </>
                ) : (
                  <div className="hidden md:flex h-full justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => router.push(routes.register)}
                    >
                      Register
                    </Button>
                    <Button
                      onClick={() => router.push(routes.login)}
                      className="rounded-full"
                    >
                      <FaWallet />
                      <p className="ml-3">Login</p>
                    </Button>
                  </div>
                )}

                <div
                  className=" dark:hover:bg-[#1F2937] hover:bg-[#F3F4F6] rounded-full p-1"
                  aria-label="Shopping Cart"
                >
                  {isClient && <Cart />}
                  <span className="sr-only">Shopping Cart</span>
                </div>
              </div> */}
              {/* {isConnected ? (
                
              ) : (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => connectWallet()}
                >
                  Connect
                </Button>
              )} */}
            </div>
          </div>
        </MaxWidthWrapper>

        <div className=" hidden lg:block">
          {/* <Navbar categories={categories} /> */}
        </div>
      </div>
    </>
  );
};

export default Header;
