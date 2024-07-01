import Card from '@/components/Card/Card';
import CardShimmer from '@/components/Card/CardShimmer';
import ClaimNFTButton from '@/components/ClaimNFTButton';
import { useGetUserNFTs } from '@/lib/home/hooks/getUserNFTs';
import { useWeb3Store } from '@/store/web3Store';
import { getUserNFTs } from '@/utils/nft';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type Props = {};

const LIMIT = 8;
export const GET_USER_NFTS_KEY = 'getUserNFTs';
export const GET_TOTAL_PAGE_KEY = 'getTotalPage';

function MyNFT({}: Props) {
  const { walletAddress } = useWeb3Store();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(LIMIT);

  const [data, setData] = useState();

  useEffect(() => {
    const getMyNft = async () => {
      const nfts: any = await getUserNFTs(
        GET_USER_NFTS_KEY,
        walletAddress,
        offset,
        limit
      );

      setData(nfts);
    };
    getMyNft();
  }, []);

  console.log(data);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * limit));
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold my-3">My NFT</h2>

        <ClaimNFTButton />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data &&
          data.items.map((value: any, index: any) => (
            <Card
              key={index}
              imageUrl={value.image}
              url={`/my-nft/${value.tokenId}`}
              name={value.name}
            ></Card>
          ))) ||
          [...Array(limit)].map((value, index) => (
            <CardShimmer key={index}></CardShimmer>
          ))}
      </div>
      {data?.meta?.totalPage == 0 && !isValidating && (
        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold">No NFT found</h2>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={data?.meta?.totalPage || 0}
        previousLabel="< previous"
        containerClassName="flex justify-center items-center space-x-2 mt-4"
        activeClassName="bg-gray-900 text-white p-2 rounded"
        pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
        previousClassName="bg-gray-200 p-2 text-center rounded"
        nextClassName="bg-gray-200 p-2 text-center rounded"
        pageLinkClassName="block"
      />
    </section>
  );
}

export default MyNFT;
