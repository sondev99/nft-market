'use client';

import ProductReel from '@/components/ProductReel';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HeroSections } from '@/components/Hero';
import { SubcribeSection } from '@/components/SubcribeSection';
import { useContext, useEffect, useState } from 'react';
import { MarketplaceNFTs } from '@/components/MarketplaceNFTs';

// interface ProductReel {
//   title: string;
//   href?: string;
//   products?: ProductResponse[] | undefined;
// }

export default function Home() {
  const [nfts, setNfts] = useState([]);

  return (
    <>
      <MaxWidthWrapper>
        <HeroSections />
        {/* {productReels.map((item) => (
          <ProductReel
            key={item.title}
            title={item.title}
            href={item.href}
            products={item.products}
          />
        ))} */}
        {/* <ProductReel
          key="All Nfts"
          title="All Nfts"
          // href={item.href}
          nfts={nfts}
        /> */}
        <MarketplaceNFTs />
        <SubcribeSection />
      </MaxWidthWrapper>
    </>
  );
}
