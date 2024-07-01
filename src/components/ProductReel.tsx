'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NFTCard from './Card/NFTCard';

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  nfts: any;
}

const ProductReel = ({ title, subtitle, href, nfts }: ProductReelProps) => {
  return (
    <section className="py-12 z-0">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold  sm:text-3xl">{title}</h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Show all <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative mt-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {nfts?.map((nft: any, i: number) => (
            <NFTCard key={`product-${i}`} nft={nft} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
