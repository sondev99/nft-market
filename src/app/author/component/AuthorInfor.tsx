import { Button } from '@/components/ui/button';
import { UploadIcon, VerifiIcon } from '@/icon';
import Image from 'next/image';
import React from 'react';
import images from '@/img';

type Props = {};

const AuthorInfor = (props: Props) => {
  return (
    <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
      <div className="w-32 lg:w-44 flex-shrink-0 mt-12 sm:mt-0">
        <div
          className="nc-NcImage aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
          data-nc-id="NcImage"
        >
          <Image
            src={images.user10}
            className="object-cover w-full h-full"
            alt="nc-imgs"
          />
        </div>
      </div>
      <div className="pt-5 md:pt-1 md:ml-6 xl:ml-14 flex-grow">
        <div className="max-w-screen-sm ">
          <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
            <span>Dony Herrera</span>
            <span className="ml-2">
              <VerifiIcon />
            </span>
          </h2>
          <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
            <span className="text-neutral-700 dark:text-neutral-300">
              4.0xc4c16ac453sa645a...b21a{' '}
            </span>
            <svg width={20} height={21} viewBox="0 0 20 21" fill="none">
              <path
                d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to @ether_cards, an NFT Monetization Platform.
          </span>
        </div>
        <div className="mt-4 ">
          <nav
            className="nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 "
            data-nc-id="SocialsList"
          >
            <a
              className="block w-7 h-7"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <Image
                className="rounded-full"
                src={images.facebook}
                alt="socail"
              />
            </a>
            <a
              className="block w-7 h-7"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <Image
                className="rounded-full"
                src={images.twitter}
                alt="socail"
              />
            </a>
            <a
              className="block w-7 h-7"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Youtube"
            >
              <Image
                className="rounded-full"
                src={images.youtube}
                alt="socail"
              />
            </a>
            <a
              className="block w-7 h-7"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
            >
              <Image
                className="rounded-full"
                src={images.telegram}
                alt="socail"
              />
            </a>
          </nav>
        </div>
      </div>
      <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
        <div>
          <div className="relative inline-block text-left">
            <button
              className=" w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer "
              title="More"
              id="headlessui-menu-button-:r1h:"
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
        <div className="relative inline-block text-left">
          <button
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer mx-2"
            title="More"
            id="headlessui-menu-button-:r1i:"
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <UploadIcon />
          </button>
        </div>
        <Button className=" relative  inline-flex items-center justify-center rounded-full ">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default AuthorInfor;
