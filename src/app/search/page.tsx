'use client';
import Image from 'next/image';

import productApi from '@/apis/productApi';
import Filter from '@/components/Filter';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/Input/SearchBar';
import images from '@/img';
import NFTCard from '@/components/NFTCard/NFTCard';
import { useSearch } from '@/store/useSearch';

type SearchPageProps = {};

const SearchPage = (props: SearchPageProps) => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || '');
  const [products, setProducts] = useState<ProductResponse[]>();

  useEffect(() => {
    const fetchData = async () => {
      const param = {
        searchText: encodedSearchQuery,
        offset: 0,
        pageSize: 5,
        sortStr: '',
      };
      try {
        const productResponse = await productApi.getByConditionAndPagination(
          param
        );
        console.log('productResponse', productResponse);
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [encodedSearchQuery]);

  console.log('productResponse', products);

  if (!encodedSearchQuery) {
    router.push('/');
  }

  return (
    <>
      <MaxWidthWrapper>
        {/* <Filter /> */}
        <div className="w-full flex justify-center mt-10">
          <SearchBar />
        </div>
        <div className="mt-6 flex items-center w-full">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {products?.map((product, i) => (
              <NFTCard key={`product-${i}`} product={product} index={i} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SearchPage;
