import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import CartClient from './CartClient';

type CartProps = {};

const Cart = (props: CartProps) => {
  return (
    <div className="pt-8">
      <MaxWidthWrapper>
        <CartClient />
      </MaxWidthWrapper>
    </div>
  );
};

export default Cart;
