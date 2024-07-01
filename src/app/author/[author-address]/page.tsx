'use client';

import React, { useState, useContext, useEffect } from 'react';

//INTENAL IMPORT
import images from '@/img';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { UploadIcon, VerifiIcon } from '@/icon';
import { Button } from '@/components/ui/button';
import AuthorInfor from '../component/AuthorInfor';
import AuthorTaps from '../component/AuthorTaps';
import AuthorNFTCardBox from '../component/AuthorNFTCardBox';

const authorPage = () => {
  const [listedNfts, setListedNfts] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const [nfts, setNfts] = useState<nft[]>([]);
  const [myNfts, setMyNfts] = useState<nft[]>([]);

  useEffect(() => {
    //@ts-ignore
    fetchMyNFTsOrListedNFTs('fetchItemsListed').then((items: any) => {
      setNfts(items);
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    fetchMyNFTsOrListedNFTs('fetchMyNFTs').then((items: any) => {
      setMyNfts(items);
    });
  }, []);

  console.log('myNfts', myNfts);
  console.log('listed Nft', nfts);

  return (
    <>
      <div className="relative w-full h-40 md:h-60 2xl:h-72">
        <div className="nc-NcImage absolute inset-0" data-nc-id="NcImage">
          <img
            src="https://chisnghiax.com/ciscryp/static/media/authorBanner.ebee7e43db5be48a5283.png"
            className="object-cover w-full h-full"
            alt="nc-imgs"
          />
        </div>
      </div>
      <MaxWidthWrapper className="-mt-10 lg:-mt-16">
        <AuthorInfor />
      </MaxWidthWrapper>
      <div className="mt-16">
        <AuthorTaps
          setListedNfts={setListedNfts}
          setCreated={setCreated}
          setLike={setLike}
          setFollower={setFollower}
          setFollowing={setFollowing}
        />
      </div>
      <AuthorNFTCardBox
        listedNfts={listedNfts}
        created={created}
        nfts={nfts}
        myNfts={myNfts}
      />
    </>
  );
};

export default authorPage;
