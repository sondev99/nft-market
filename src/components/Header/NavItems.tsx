'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from './Header';
import NavItem from './NavItem';
interface NavbarItemProps {
  categories: Navigation[] | undefined;
}

const NavItems = ({ categories }: NavbarItemProps) => {
  return (
    <div className=" flex flex-row items-center justify-start overflow-x-auto gap-3">
      {categories?.map((item) => (
        <NavItem category={item} key={item.label} />
      ))}
    </div>
  );
};

export default NavItems;
