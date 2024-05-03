'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NFTCard from '@/components/NFTCard/NFTCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface ProductReelProps {
  listedNfts: boolean;
  created: boolean;
  nfts: any;
  myNfts: any;
}

const AuthorNFTCardBox = ({
  nfts,
  myNfts,
  created,
  listedNfts,
}: ProductReelProps) => {
  return (
    <MaxWidthWrapper>
      <section className="py-12 z-0">
        <div className="relative mt-6">
          {created && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {myNfts?.map((myNft: any, i: number) => (
                <NFTCard key={`product-${i}`} nft={myNft} index={i} />
              ))}
            </div>
          )}
          {listedNfts && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {nfts?.map((nft: any, i: number) => (
                <NFTCard key={`product-${i}`} nft={nft} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default AuthorNFTCardBox;
