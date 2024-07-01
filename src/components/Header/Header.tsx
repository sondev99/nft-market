'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { FaRegMoon, FaWallet } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import MaxWidthWrapper from '../MaxWidthWrapper';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button, buttonVariants } from '../ui/button';
import ProfileButton from '../ProfileButton';
import { Separator } from '../ui/separator';
import { useUser } from '@/store/useUser';
import Navbar from './Navbar';
import Cart from '../Cart';
import images from '@/img';
import routes from '@/routes';
import SearchInput from '../Input/SearchInput';
import Image from 'next/image';
import { CHAIN_ID, CHAIN_NAME, useWeb3Store } from '@/store/web3Store';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export interface Navigation {
  href: string;
  label: string;
  icon: string;
  name: string;
}

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { connect, isConnected, walletAddress, disconnect } = useWeb3Store();

  const [chainId, setChainId] = useState<any>(null);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    if (window.ethereum.chainId !== CHAIN_ID) {
      Swal.fire({
        title: 'Error !',
        text: `You are not connected to the correct network. Please
                      switch to ${CHAIN_NAME}`,
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'Change Network',
      }).then(({ isConfirmed }) => {
        console.log(isConfirmed);
        if (isConfirmed) {
          () => changeNetwork();
        }
      });
    }
  }, [ethers]);

  const changeNetwork = async () => {
    console.log('-------------------------');
    if (!chainId) {
      toast.error('Please install Metamask');
    }

    if (window.ethereum.chainId !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Localnet',
                chainId: CHAIN_ID,
                nativeCurrency: {
                  name: 'ETH',
                  decimals: 18,
                  symbol: 'ETH',
                },
                rpcUrls: ['http://localhost:8545'],
              },
            ],
          });
        }
      }
    }
  };

  const categories: Category[] = [
    {
      label: 'All',
      href: '/',
    },
    {
      label: 'Art',
      href: 'art',
    },
    {
      label: 'Gamming',
      href: 'gamming',
    },
    {
      label: 'Memberships',
      href: 'memberships',
    },
    {
      label: 'PFPd',
      href: 'pfpd',
    },
    {
      label: 'Photography',
      href: 'photography',
    },
    {
      label: 'Music',
      href: 'mucsic',
    },
  ];

  const { userInfo, isLogined } = useUser();
  return (
    <>
      <div className="sticky z-50 top-0 inset-x-0 dark:bg-[#111827] bg-white">
        <MaxWidthWrapper>
          <div className="relative  flex h-16 items-center justify-between w-full">
            <div className="flex items-center justify-between">
              <Sheet>
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
              </Sheet>
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
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <IoSunnyOutline className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <FaRegMoon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>

                {/* {chainId !== CHAIN_ID && (


                  <div className="bg-yellow-100 p-2 rounded-md mt-4">
                    <p>
                      You are not connected to the correct network. Please
                      switch to {CHAIN_NAME}
                    </p>

                    <div className="h-4"></div>

                    <Button onClick={() => changeNetwork()}>
                      <span>Change Network</span>
                    </Button>
                  </div>
                )} */}

                {/* {userInfo ? (
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
                        onClick={() => connect()}
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
                )} */}

                {isConnected ? (
                  <div className="hidden md:flex h-full justify-center items-center gap-2">
                    <Button
                      onClick={() => router.push(routes.upload)}
                      className="rounded-full"
                    >
                      <FaWallet />
                      <p className="ml-3">Create</p>
                    </Button>
                    <Separator orientation="vertical" className="h-10" />

                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => disconnect()}
                    >
                      Disconnetct
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => connect()}
                    >
                      Connect
                    </Button>
                  </>
                )}
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
              </div> */}
            </div>
          </div>
        </MaxWidthWrapper>

        <div className=" hidden lg:block">
          <Navbar categories={categories} />
        </div>
      </div>
    </>
  );
};

export default Header;
