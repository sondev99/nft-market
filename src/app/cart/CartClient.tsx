'use client';

import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import ItemContent from './ItemContent';
import { formatPrice } from '@/lib/formatPrice';
import checkoutApi from '@/apis/checkoutApi';
import { STRIPE } from '@/constant/paymentMethod';
import { useUser } from '@/store/useUser';
import { CgSpinner } from 'react-icons/cg';

import routes from '@/routes';
import { useRouter } from 'next/navigation';
import { PENDING, SUCCESS_STATUS } from '@/constant/commonConstant';
import orderApi from '@/apis/orderApi';

type Props = {};

const CartClient = (props: Props) => {
  const { cartProducts, clearCart, totalPrice } = useCart();

  const { userInfo } = useUser();

  const [cartTotalAmout, setCartTotalAmout] = useState<number>(totalPrice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const orderItemRequest: OrderItemDto[] = cartProducts.map((product) => {
    return {
      productId: product.id,
      userId: userInfo?.id,
      quantity: product.quantity,
    };
  });

  const orderData: OrderRequest = {
    userId: userInfo?.id,
    totalPrice: totalPrice,
    deliveryAddress: 'userInfo?.addresses?.toString() ',
    status: PENDING,
    orderItemRequest: orderItemRequest,
  };

  const handleCheckout = async () => {
    console.log(orderData);
    setIsLoading(true);
    const orderResponse = await orderApi.createOrder(orderData);
    console.log('orderResponse: ', orderResponse);
    const stripeItemList: StripeItem[] = cartProducts.map((product) => {
      return {
        price: product.price,
        quantity: product.quantity,
        productName: product.name,
        productId: product.id,
        userId: userInfo?.id,
      };
    });

    const stripeRequest: StripeRequest = {
      orderId: orderResponse?.data,
      stripeItemList,
    };

    const checkoutData: CheckoutRequest = {
      paymentMethod: STRIPE,
      totalPrice: totalPrice,
      stripeRequest,
    };

    console.log(checkoutData);
    const checkoutResponse = await checkoutApi.checkout(checkoutData);
    setIsLoading(false);

    if (
      checkoutResponse.status === SUCCESS_STATUS &&
      orderResponse.status === SUCCESS_STATUS
    ) {
      router.push(checkoutResponse.data);
    }
  };

  useEffect(() => {
    setCartTotalAmout(totalPrice);
  }, [totalPrice]);

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={'/'}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-cente mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            variant="outline"
            className="p-1"
            onClick={() => {
              clearCart();
            }}
          >
            Clear Cart
          </Button>
        </div>
        <div className="text-sm flex-col flex gap-1 items-center">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmout)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          {userInfo ? (
            <Button onClick={handleCheckout} className="w-full relative">
              {isLoading && (
                <span className="animate-spin absolute left-0 px-2">
                  <CgSpinner />
                </span>
              )}
              {isLoading ? 'Loading...' : 'Checkout'}
            </Button>
          ) : (
            <Button onClick={() => router.push('/login')} className="w-full">
              Go to login
            </Button>
          )}

          <Link
            href={'/'}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartClient;
