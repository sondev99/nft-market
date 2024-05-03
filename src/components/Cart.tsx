'use client';

import { CiShoppingCart } from 'react-icons/ci';

import { useCart } from '@/store/useCart';
import Link from 'next/link';

const Cart = () => {
  const { cartQty } = useCart();

  return (
    <>
      <Link href="/cart" className="relative cursor-pointer ">
        <div className="text-3xl">
          <CiShoppingCart aria-hidden="true" />
        </div>
        <span className="absolute top-[-10px] right-[-10px] bg-[#CC0000] text-white h-5 w-5 rounded-full flex items-center justify-center ml-2 text-sm font-medium ">
          {cartQty ? cartQty : 0}
        </span>
      </Link>
    </>
  );
};

export default Cart;
