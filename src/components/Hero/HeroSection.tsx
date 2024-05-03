import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';

//INTERNAL IMPORT
import images from '../../img';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <div className="relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 lg:items-center relative">
        <div className="w-screen max-w-full xl:max-w-xl space-y-5 lg:space-y-7">
          <h1 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            <span>
              Discover 🖼
              <br /> collect, and sell <br /> extraordinary{' '}
              <span className="relative pr-3">
                <img
                  className="w-full absolute bottom-3 -left-1"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAAfCAYAAABkphawAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQLSURBVHgB7ZsNUtNAFMffhlFhdMbewNwAPAHxBPQG1hMYuIBwASbeAE5AOYHhBMYTGE5gnVGRGcn6f5ukLKFtkjYNTft+M7Bpkn7/8j42qSKgfb93QzTgZUU03AmCmAShRdSN77tKqS9YdrN1sdb6ncgotImjifp0LyHjOkp9vfX9PglCSziTVkLOnlbq4vbo6BMJQguoH6gPdxAB6WFUvN9BqbPnSXKogmBEgrAkFP+bUCcWkbpRWComNbNgN1q/Ja2HU/ZjUb9LqhaWhSquQHQ8hnSzhJPoKDTOo2YFgh1DtA9YnFYTSnQUGkdN21ChbmQ4Op5A3jMShBrwSRQe8yZYld2hQqo2nXWSJCeSroVZsHx/iLwtpT7ipmdWKhVsn54elorIVIyOIqQwEfjjbTnOQaL1ADd7xe3cc1QS0XrA0ujIYJ9jCHkuQm4uLJ/jOPuQzKcJ8tlweVdLxOwJODpeYHGvZNcYpwqHd0nyWYTcDCz5BlSSPW1qR8TCkw6y6OiW7Sspe32ZV76MESw82Q6CYG4RrRfC6fo9VReSU3ZIQifhhuMvsuGsmq8Elu9cp5cbhvnKhUVkOF1jyIWsgpn2wRhKlFx9Mvn6CvJBIo/qy8eE+M7PtyHgpOsWGhExZw4hTZSkJLl8EQRDElYGK+V6lE+11CdE1LzcIToru2imURFzLCH3qXrdEGP/UFL30/DL9/dwms1Dg3lAaSM6T9RjKstnsxQRczIhvapNjYWRUiLl8hiLh6i3QLplWLZoHvlsliqijemyid4jF3tUH3OUJRhfBUFEQi3yBsNKtYtEPGaktB7i+7iaVvPVpTURc+ZM2zYxZI40ouUdjkQR8yG5dJo7W6JdnR74Li1OhMh5Vex2m6J1EW24IMbA85FclyyUGnCkX2EMcYRGm3I1OR/USK97OCDdhqVjTNTDY39bJOVW5UlFzBlPDxAdINo18aMtIycK7+hfklzjcaOuCsqyQYbeVppOWbw3+Iw44rm0WHotMq71+PNqu2FcCRGL/Pb9vsNizp++p2E+bHyRIzx+zJLiC46TdH3c5pxmdvD1WLJneI9JKpURTTtOD2kwr+OalM3mScUrspIi2oy7uzRaetQOMT6Ykc4uDkaKivMNEOa67M446/AaNexYIKRMN1ssjm0S432EnGpXselbeRGLZHWlhxe+zymKlhcxusxYuq6UJZ0TsQhHzKx+4vnKXSq/KmidSEsNrTnKcYkRvmQJO1gLd17ESbCcKq23eNylNDV2VVBTvyLCRSgVfuIv4mmrrgo3jbUUcRrZHKZpDDJJOa3vmo2prC61S0zp1SimJs3qT9M8Qbh43WSbxUaJWBVryiSvP11rs1t2f25y1MNfQcb2KFccPeY/fecD/SyCeGwAAAAASUVORK5CYII="
                  alt="Vector1"
                />
                <span className="relative">NFTs</span>
              </span>
            </span>
          </h1>
          <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          <div className="flex gap-4">
            <Button className="font-medium px-4 py-3 sm:px-6 text-base">
              <span className="mr-1.5">Explore</span>
              <FaSearch size={16} />
            </Button>
            <Button
              className="font-medium px-4 py-3 sm:px-6 text-base"
              variant="outline"
            >
              <span className="mr-1.5">Create</span>
              <IoMdCreate size={16} />
            </Button>
          </div>
        </div>
        <div className="flex-grow">
          <Image
            src={images.hero2}
            alt="Hero section"
            width={600}
            height={600}
            className="w-full"
          />
        </div>
      </div>
      <div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
          <img
            className="hidden md:block absolute inset-x-0 -top-1"
            src="https://chisnghiax.com/ciscryp/static/media/VectorHIW.1a377ddaa77cc48b5b38a6739a397aff.svg"
            alt="vector"
          />
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            <div
              className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              data-nc-id="NcImage"
            >
              <Image
                src={images.service1}
                className="object-cover w-full h-full"
                alt="nc-imgs"
              />
            </div>
            <div className="text-center mt-auto space-y-5">
              <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-blue-800 bg-blue-100 ">
                Step 1
              </span>
              <h3 className="text-lg font-semibold">Filter &amp; Discover</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                Connect with wallet, discover, buy NTFs, sell your NFTs and earn
                money
              </span>
            </div>
          </div>
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            <div
              className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              data-nc-id="NcImage"
            >
              <Image
                src={images.service2}
                className="object-cover w-full h-full"
                alt="nc-imgs"
              />
            </div>
            <div className="text-center mt-auto space-y-5">
              <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs  text-pink-800 bg-pink-100  relative">
                Step 2
              </span>
              <h3 className="text-lg font-semibold">Connect wallet</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                Connect with wallet, discover, buy NTFs, sell your NFTs and earn
                money
              </span>
            </div>
          </div>
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            <div
              className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              data-nc-id="NcImage"
            >
              <Image
                src={images.service3}
                className="object-cover w-full h-full"
                alt="nc-imgs"
              />
            </div>
            <div className="text-center mt-auto space-y-5">
              <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100  relative">
                Step 3
              </span>
              <h3 className="text-lg font-semibold">Start trading</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                Connect with wallet, discover, buy NTFs, sell your NFTs and earn
                money
              </span>
            </div>
          </div>
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            <div
              className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              data-nc-id="NcImage"
            >
              <Image
                src={images.service4}
                className="object-cover w-full h-full"
                alt="nc-imgs"
              />
            </div>
            <div className="text-center mt-auto space-y-5">
              <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs  text-green-800 bg-green-100  relative">
                Step 4
              </span>
              <h3 className="text-lg font-semibold">Earn money</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                Connect with wallet, discover, buy NTFs, sell your NFTs and earn
                money
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
