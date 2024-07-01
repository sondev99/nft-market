'use client';

import * as React from 'react';
import MyNFT from './MyNFTs';
import { useWeb3Store } from '@/store/web3Store';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export interface IMyNFTPageProps {}

export default function MyNFTPage(props: IMyNFTPageProps) {
  const { isConnected } = useWeb3Store();
  return (
    <>
      <MaxWidthWrapper>
        <div className="space-y-2">{isConnected && <MyNFT />}</div>
      </MaxWidthWrapper>
    </>
  );
}
