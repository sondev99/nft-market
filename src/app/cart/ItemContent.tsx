'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CartProductType } from '../product/[productId]/ProductDetail';
import { formatPrice } from '@/lib/formatPrice';
import Link from 'next/link';
import Image from 'next/image';
import SetQuantity from '@/components/SetQuantity';
import { useCart } from '@/store/useCart';
import { toast } from 'react-toastify';

type ItemContentProps = {
  item: CartProductType;
};

const ItemContent = ({ item }: ItemContentProps) => {
  const cart = useCart();
  const [cartProducts, setCartProducts] = useState<CartProductType[]>(
    cart.cartProducts
  );
  const updateCartFun = cart.handleChangeCart;

  console.log(cart.totalPrice);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;

            return acc;
          },
          {
            total: 0,
          }
        );
        cart.setTotal(total);
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      console.log(product);
      let updateCart;
      if (product.quantity === 1) {
        return toast.error('Oops, Minimum reached');
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = --updateCart[existingIndex]
            .quantity;
        }

        updateCartFun(updateCart);
        setCartProducts(updateCart);
        localStorage.setItem('cart-storage', JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 99) {
        return toast.error('Oops, Maximum reached');
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = ++updateCart[existingIndex]
            .quantity;
        }

        updateCartFun(updateCart);
        setCartProducts(updateCart);
        localStorage.setItem('cart-storage', JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  return (
    <div
      className="
  grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center
  "
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.imageUrl}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between h-full">
          <Link href={`/product/${item.id}`}>{item.name}</Link>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => {
                cart.removeItem(item.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center font-semibold">
        <SetQuantity
          cartProduct={item}
          cartCounter={true}
          handleQtyIncrease={() => {
            handleQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleQtyDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
