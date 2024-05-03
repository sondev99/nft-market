'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import NullData from '@/components/NullData';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import { CategoryIcon, MakeOfferIcon, PlaceABidIcon, UploadIcon } from '@/icon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import images from '@/img';
// IMPORT SMART CONTRACT DATA
import { AppContext } from '@/context/app-context';
import Link from 'next/link';
import routes from '@/routes';

const NftDetailPage = () => {
  const { buyNFT, walletAddress } = useContext(AppContext);
  const router = useRouter();
  const [nft, setNft] = useState<nft>({
    image: '',
    description: '',
    tokenId: '',
    name: '',
    owner: '',
    price: '',
    seller: '',
  });
  if (!nft)
    return <NullData title="Oops! Product with the given id does not exist" />;

  const searchParams = useSearchParams();
  const image = searchParams.get('image');
  const tokenId = searchParams.get('tokenId');
  const owner = searchParams.get('owner');
  const price = searchParams.get('price');
  const seller = searchParams.get('seller');
  const name = searchParams.get('name');
  const description = searchParams.get('description');

  const nftData = { image, tokenId, owner, price, seller, name, description };
  useEffect(() => {
    setNft(nftData);
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          <div className="space-y-8 lg:space-y-10">
            <div className="relative">
              <div
                className="nc-NcImage aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                data-nc-id="NcImage"
              >
                <Image
                  fill
                  src={nft.image || ''}
                  className="object-cover w-full h-full"
                  alt="nc-imgs"
                />
              </div>
              <div className="bg-black/50  flex items-center justify-center rounded-full text-white absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10">
                <CategoryIcon />
              </div>
              <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute right-3 top-3 ">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <FaRegHeart size={20} />
                </svg>
                <span className="ml-2 text-sm">22</span>
              </button>
            </div>
            <div className="w-full rounded-2xl">
              <button
                className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
                id="headlessui-disclosure-button-:r18:"
                type="button"
                aria-expanded="true"
                aria-controls="headlessui-disclosure-panel-:r19:"
              >
                <span>Descriptions</span>
                <IoIosArrowDown />
              </button>
              <p
                className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
                id="headlessui-disclosure-panel-:r19:"
              >
                {nft.description}
              </p>
              <div className="mt-5 md:mt-8">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
                  id="headlessui-disclosure-button-:r1a:"
                  type="button"
                  aria-expanded="true"
                  aria-controls="headlessui-disclosure-panel-:r1b:"
                >
                  <span>Details</span>
                  <IoIosArrowDown />
                </button>
                <div
                  className="px-4 pt-4 pb-2 flex flex-col text-xs text-neutral-500 dark:text-neutral-400 overflow-hidden"
                  id="headlessui-disclosure-panel-:r1b:"
                >
                  <span>2000 x 2000 px.IMAGE(685KB)</span>
                  <br />
                  <span>Contract Address</span>
                  <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {nft.seller}
                  </span>
                  <br />
                  <span>Token ID</span>
                  <span className="text-base text-neutral-900 dark:text-neutral-100">
                    {nft.tokenId}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <div className="pb-9 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-green-800 bg-green-100  ">
                    Virtual Worlds
                  </span>
                  <div className="flow-root">
                    <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
                      <div className="relative inline-block text-left">
                        <button
                          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer "
                          title="More"
                          id="headlessui-menu-button-:r1c:"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <UploadIcon />
                        </button>
                      </div>
                      <div>
                        <div className="relative inline-block text-left">
                          <button
                            className=" py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer "
                            title="More"
                            id="headlessui-menu-button-:r1d:"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              className="w-4 h-4 sm:h-5 sm:w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="nc-NcModal" />
                        <div className="nc-NcModal" />
                        <div className="nc-NcModal" />
                        <div className="nc-NcModal" />
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {nft.name} #{nft.tokenId}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
                  <div className="flex items-center ">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-9 w-9 ring-1 ring-white dark:ring-neutral-900">
                      <Image
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        src={images.user1}
                        alt="John Doe"
                      />
                      <span className="wil-avatar__name">J</span>
                    </div>
                    <Link
                      href={{ pathname: routes.author, query: `${nft.seller}` }}
                    >
                      <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                        <span className="text-sm">Creator</span>
                        <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                          <span>Karli Costa</span>
                          <span className="ml-1">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <path
                                d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                                fill="#38BDF8"
                                stroke="#38BDF8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700" />
                  <div className="flex items-center">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-9 w-9 ring-1 ring-white dark:ring-neutral-900">
                      <Image
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        src={images.creatorbackground1}
                        alt="John Doe"
                      />
                      <span className="wil-avatar__name">J</span>
                    </div>
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                      <span className="text-sm">Collection</span>
                      <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                        <span>The Moon Ape</span>
                        <span className="ml-1">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <path
                              d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                              fill="#38BDF8"
                              stroke="#38BDF8"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="pb-9 pt-14">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                    <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-[#111827] text-sm text-neutral-500 dark:text-neutral-400">
                      Current Bid
                    </span>
                    <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                      {nft.price} ETH
                    </span>
                    <span className="text-lg text-neutral-400 sm:ml-5">
                      ( ≈ $3,221.22)
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
                    [96 in stock]
                  </span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {walletAddress === nft.seller?.toLocaleLowerCase() ? (
                    <p className="w-full">You can't buy your own NFT</p>
                  ) : walletAddress === nft.owner?.toLocaleLowerCase() ? (
                    <Button className="w-full rounded-full py-6">
                      <PlaceABidIcon />
                      <span className="ml-2.5">List on Marketplace</span>
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-full py-6"
                      onClick={() => {
                        buyNFT(nft);
                        router.push(`${routes.author}/${walletAddress}`);
                      }}
                    >
                      <PlaceABidIcon />
                      <span className="ml-2.5">Buy NFT</span>
                    </Button>
                  )}

                  <Button variant="secondary" className="w-full rounded-full">
                    <MakeOfferIcon />
                    <span className="ml-2.5"> Make offer</span>
                  </Button>
                </div>
              </div>
              {/* <div className="pt-9">
                <div className="w-full pdx-2 sm:px-0">
                  <div
                    className="flex justify-start pd-1 space-x-2.5 rounded-full bordedr border-neutral-300 dark:border-neutral-500"
                    role="tablist"
                    aria-orientation="horizontal"
                  >
                    <button
                      className="px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                      id="headlessui-tabs-tab-:r1e:"
                      role="tab"
                      type="button"
                      aria-selected="true"
                      tabIndex={0}
                      aria-controls="headlessui-tabs-panel-:r1h:"
                    >
                      Bid History
                    </button>
                    <button
                      className="px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                      id="headlessui-tabs-tab-:r1f:"
                      role="tab"
                      type="button"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      Provenance
                    </button>
                    <button
                      className="px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                      id="headlessui-tabs-tab-:r1g:"
                      role="tab"
                      type="button"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      Owner
                    </button>
                  </div>
                  <div className="mt-4">
                    <div
                      className="rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
                      id="headlessui-tabs-panel-:r1h:"
                      role="tabpanel"
                      tabIndex={0}
                      aria-labelledby="headlessui-tabs-tab-:r1e:"
                    >
                      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
                        <li className="relative py-4 ">
                          <div className="flex items-center">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white dark:ring-neutral-900">
                              <img
                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                src="/ciscryp/static/media/Image-3.f257bc3c2ce5ae3a57db.png"
                                alt="John Doe"
                              />
                              <span className="wil-avatar__name">J</span>
                            </div>
                            <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                              <span className="flex items-center text-sm">
                                <span className>Offer of $700 by</span>
                                <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                                  Martoutaa
                                </span>
                              </span>
                              <span className="text-xs mt-1">
                                Jun 14 - 4:12 PM
                              </span>
                            </span>
                          </div>
                        </li>
                        <li className="relative py-4 bg-neutradl-100">
                          <div className="flex items-center">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white dark:ring-neutral-900">
                              <img
                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                src="/ciscryp/static/media/Image-8.5ae85a64aab1965e33a5.png"
                                alt="John Doe"
                              />
                              <span className="wil-avatar__name">J</span>
                            </div>
                            <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                              <span className="flex items-center text-sm">
                                <span className>Placed a bid $500 by</span>
                                <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                                  Martoutaa
                                </span>
                              </span>
                              <span className="text-xs mt-1">
                                Jun 14 - 4:12 PM
                              </span>
                            </span>
                          </div>
                        </li>
                        <li className="relative py-4 ">
                          <div className="flex items-center">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white dark:ring-neutral-900">
                              <img
                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                src="/ciscryp/static/media/Image-4.36899b28c72dc4bc41a9.png"
                                alt="John Doe"
                              />
                              <span className="wil-avatar__name">J</span>
                            </div>
                            <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                              <span className="flex items-center text-sm">
                                <span className>Placed a bid $500 by</span>
                                <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                                  Martoutaa
                                </span>
                              </span>
                              <span className="text-xs mt-1">
                                Jun 14 - 4:12 PM
                              </span>
                            </span>
                          </div>
                        </li>
                        <li className="relative py-4 bg-neutradl-100">
                          <div className="flex items-center">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white dark:ring-neutral-900">
                              <img
                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                src="/ciscryp/static/media/Image-2.405c62ff9ad88c47e28c.png"
                                alt="John Doe"
                              />
                              <span className="wil-avatar__name">J</span>
                            </div>
                            <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                              <span className="flex items-center text-sm">
                                <span>Placed a bid $500 by</span>
                                <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                                  Martoutaa
                                </span>
                              </span>
                              <span className="text-xs mt-1">
                                Jun 14 - 4:12 PM
                              </span>
                            </span>
                          </div>
                        </li>
                        <li className="relative py-4 ">
                          <div className="flex items-center">
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 ring-1 ring-white dark:ring-neutral-900">
                              <img
                                className="absolute inset-0 w-full h-full object-cover rounded-full"
                                src="/ciscryp/static/media/Image-6.f9fbe7060b79c99c7a60.png"
                                alt="John Doe"
                              />
                              <span className="wil-avatar__name">J</span>
                            </div>
                            <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                              <span className="flex items-center text-sm">
                                <span className>Placed a bid $500 by</span>
                                <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                                  Martoutaa
                                </span>
                              </span>
                              <span className="text-xs mt-1">
                                Jun 14 - 4:12 PM
                              </span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default NftDetailPage;
