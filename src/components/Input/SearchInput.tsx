'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button } from '../ui/button';
import { CiSearch } from 'react-icons/ci';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';

type SearchInputProps = {
  id: string;
  value?: any;
  disabled?: boolean;
  rules?: RegisterOptions;
};

const SearchInput = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    console.log('data', data);
    setIsLoading(true);
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="flex flex-col ">
      <form
        className="relative mx-auto flex w-full max-w-lg items-center justify-between rounded-full border shadow-lg"
        onSubmit={handleSubmit((data) => handleSearch(data))}
      >
        <CiSearch className="absolute left-2 block h-5 w-5 text-gray-400" />
        <Input
          id="searchQuery"
          autoComplete="off"
          {...register('searchQuery')}
          type="text"
          className=" w-full  py-3 pr-40 pl-12 outline-none focus:ring-2"
          placeholder="Search product ...  "
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default SearchInput;
