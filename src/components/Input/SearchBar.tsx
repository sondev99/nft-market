import React, { useState } from 'react';
import { BsSearch, BsArrowRight } from 'react-icons/bs';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { useSearch } from '@/store/useSearch';

//INTERNAL IMPORT
const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchQuery: '',
    },
  });

  const handleSearch = async (data: any) => {
    const searchQuery = data.searchQuery;
    if (typeof searchQuery !== 'string') {
      return;
    }
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <form
      className="w-[40%]"
      onSubmit={handleSubmit((data) => handleSearch(data))}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          id="searchQuery"
          autoComplete="off"
          {...register('searchQuery')}
          type="text"
          className="block w-full p-4 ps-10 text-sm rounded-full pr-5 pl-14 py-5"
          placeholder="Search product ...  "
        />

        <Button
          type="submit"
          className="text-white absolute end-0 bottom-0 rounded-full"
        >
          <BsArrowRight size={20} />
        </Button>
      </div>
    </form>
    // <div className="w-full">
    //   <div className="w-40 mx-auto  flex rounded-full items-center mt-32 mb-12 shadow-slate-500">
    //     <BsSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6" />
    //     <input type="text" placeholder="Type yout keyword..." />
    //     <BsArrowRight className="font" />
    //   </div>
    // </div>
  );
};

export default SearchBar;
