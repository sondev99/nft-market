'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Navigation } from './Header';
import Link from 'next/link';

interface NavItemProps {
  category: Category;
}

const NavItem = ({ category }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/category/${category.label}`);

  const isMainPage = pathname === '/';

  if (category.label === 'All') {
    return (
      <Link
        href="/"
        className={`flex items-center justify-center text-center gap-1 py-2 px-3 border-b-2  rounded-[10px] cursor-pointer ${
          isMainPage ? 'bg-[#ffffff1f] ' : 'border-transparent'
        }`}
      >
        {/* <Image src={category.icon} alt={category.label} width={20} height={20} /> */}
        <div className="font-bold text-base text-[#737373]">
          {category.label}
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        href={{
          pathname: `/category/${category.href}`,
        }}
        className={`flex items-center justify-center text-center gap-1 p-2 border-b-2  rounded-[10px] cursor-pointer ${
          isActive ? 'dark:bg-[#ffffff1f]' : 'border-transparent'
        }`}
      >
        {/* <Image src={category.icon} alt={category.label} width={20} height={20} /> */}
        <div className="font-bold text-base text-[#737373]">
          {category.label}
        </div>
      </Link>
    );
  }
};

export default NavItem;
