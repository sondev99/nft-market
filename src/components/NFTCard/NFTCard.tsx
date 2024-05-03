'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdStar } from 'react-icons/io';

import { cn } from '@/lib/utils';
import images from '@/img';
import ImageSlider from '../ImageSlider';
import { Skeleton } from '../ui/skeleton';
import { formatPrice } from '@/lib/formatPrice';
import { convertRate } from '@/utils/convertRate';
import { truncateText } from '@/utils/truncatText';
import Image from 'next/image';
import moment from 'moment';
interface ProductListingProps {
  nft: any;
  index: number;
}

const NFTCard = ({ nft, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!nft || !isVisible) return <ProductPlaceholder />;

  if (isVisible && nft) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer hover:group/main rounded-3xl hover:bg-[#F9FAFB]   hover:shadow-lg dark:hover:bg-[#1F2937]',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={{ pathname: '/nft-detail', query: nft }}
      >
        <div className="flex flex-col w-full ">
          <div className="relative flex-shrink-0 ">
            <div
              className={cn(
                ' flex aspect-w-11 aspect-h-12 w-full h-7 rounded-3xl overflow-hidden z-0'
              )}
              data-nc-id="NcImage"
            >
              <Image
                fill
                src={nft.image}
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="nc-imgs"
              />
            </div>
            <div className="bg-black/50 flex items-center justify-center rounded-full text-white absolute top-3 left-3 !w-9 !h-9">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-10 !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="#ef4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">23</span>
            </button>
            <div className="absolute top-3 inset-x-3 flex" />
          </div>
        </div>
        <div className="p-4 py-5 space-y-3">
          <div className="flex justify-between">
            <div className="flex -space-x-1 ">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-5 w-5 text-sm ring-2 ring-white dark:ring-neutral-900">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  src="/ciscryp/static/media/Image-5.b1088376a574bcedc983.png"
                  alt="John Doe"
                />
                <span className="wil-avatar__name">J</span>
              </div>
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-5 w-5 text-sm ring-2 ring-white dark:ring-neutral-900">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  src="/ciscryp/static/media/Image-10.93048ca791076288cf69.png"
                  alt="John Doe"
                />
                <span className="wil-avatar__name">J</span>
              </div>
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-5 w-5 text-sm ring-2 ring-white dark:ring-neutral-900">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  src="/ciscryp/static/media/Image-5.b1088376a574bcedc983.png"
                  alt="John Doe"
                />
                <span className="wil-avatar__name">J</span>
              </div>
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-5 w-5 text-sm ring-2 ring-white dark:ring-neutral-900">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  src="/ciscryp/static/media/Image-3.f257bc3c2ce5ae3a57db.png"
                  alt="John Doe"
                />
                <span className="wil-avatar__name">J</span>
              </div>
            </div>
            <span className="text-neutral-700 dark:text-neutral-400 text-xs">
              91 in stock
            </span>
          </div>
          <h2 className="text-lg font-medium">
            {nft.name} #{nft.tokenId}
          </h2>
          <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700" />
          <div className="flex justify-between items-center ">
            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50">
                  Price
                </span>
                <span className=" text-green-500 !leading-none">
                  {formatPrice(nft.price)} ETH
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-1 mt-0.5">
                {/* {moment(nft.createDate).fromNow()} left */}9 hours ago
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default NFTCard;
