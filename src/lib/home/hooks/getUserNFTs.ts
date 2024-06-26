import { useCallback } from 'react';
import useSWR from 'swr';
import { useWeb3Store } from '../../../store/web3Store';
import { getUserNFTs } from '../../../utils/nft';

export const GET_USER_NFTS_KEY = 'getUserNFTs';
export const GET_TOTAL_PAGE_KEY = 'getTotalPage';

export type UseGetUserNFTsProps = {
  limit: number;
  offset: number;
  walletAddress: string | null;
};

export const useGetUserNFTs = async ({
  limit,
  offset,
  walletAddress,
}: UseGetUserNFTsProps) => {
  const { isInit } = useWeb3Store();

  // const nfts = useSWR(
  //   isInit &&
  //     walletAddress &&
  //     getUserNFTs(GET_USER_NFTS_KEY, walletAddress, offset, limit)
  // );
  const nfts = await getUserNFTs(
    GET_USER_NFTS_KEY,
    walletAddress,
    offset,
    limit
  );

  return { nfts };
};
