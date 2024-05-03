'use client';

import SetQuantity from '@/components/SetQuantity';
import { Button } from '@/components/ui/button';
import { caculateSalePrice, formatPrice } from '@/lib/formatPrice';
import { Rating } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ProductSupportItem from './ProductSupportItem';
import { IconType } from 'react-icons';
import { FaShieldAlt } from 'react-icons/fa';
import { MdCheckCircle, MdOutlineLocalShipping } from 'react-icons/md';
import { CiGift } from 'react-icons/ci';
import { MdOutlineContactPhone } from 'react-icons/md';
import { IoIosReturnLeft } from 'react-icons/io';
import ProductImage from './ProductImage';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';

type ProductDetailProps = {
  product: ProductResponse;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: ImageUrl;
  quantity: number;
  price: number;
};

export type ProductSupportItemProps = {
  Icon: IconType;
  firstContent: string | null;
  secondContent: string | null;
};

const productSupport: ProductSupportItemProps[] = [
  {
    Icon: FaShieldAlt,
    firstContent: 'Guarantee',
    secondContent: 'Quality Checked',
  },
  {
    Icon: MdOutlineLocalShipping,
    firstContent: 'Free Shipping',
    secondContent: 'Free On All Products',
  },
  {
    Icon: CiGift,
    firstContent: 'Special Gift Cards',
    secondContent: 'Special Gift Cards',
  },
  {
    Icon: MdOutlineContactPhone,
    firstContent: 'Consultancy',
    secondContent: 'Lifetime 24/7/356',
  },
  {
    Icon: IoIosReturnLeft,
    firstContent: 'Free Return',
    secondContent: 'Within 7 Days',
  },
];

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const cart = useCart();
  const cartProducts = cart.cartProducts;
  const router = useRouter();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.categoryDTO.name,
    brand: product.brandDTO.name,
    selectedImg: product.imageUrls[0],
    quantity: 1,
    price: product.price,
  });
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 10) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleImageSelect = useCallback(
    (value: ImageUrl) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-4 ">
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />

        <div className="grid grid-cols-7">
          {/* Image */}
          <div className="w-full col-span-3">
            <ProductImage
              cartProduct={cartProduct}
              product={product}
              handleImageSelect={handleImageSelect}
            />
          </div>

          {/* Infor */}
          <div className="pl-5 col-span-4 flex flex-col text-slate-500">
            <div className="bg-[#F7F7F7] p-3 rounded-xl mb-2">
              <div className="flex items-center">
                Price:{' '}
                <span className="font-semibold text-xl line-through text-gray-700 ml-[60px]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex items-center">
                Sale Price:{' '}
                <span className="font-semibold text-xl text-[#ed1b24] ml-[28px]">
                  {formatPrice(product.salePrice)}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Rating name="read-only" value={product.rate} readOnly />
              <span className="ml-1">(6 reviews)</span>
            </div>
            <Horizontal />
            <div>
              <p className="font-semibold text-xl">Description</p>
              <p className="line-clamp-6">{product.description}</p>
            </div>
            <Horizontal />
            <div>
              <span className="font-semibold">CATEGORY:</span>
              {product.categoryDTO.name}
            </div>
            <div>
              <span className="font-semibold">BRAND:</span>
              {product.brandDTO.name}
            </div>
            <div
              className={
                product.quantity > 0 ? 'text-teal-400' : 'text-rose-400'
              }
            >
              {product.quantity > 0 ? 'In stock' : 'Out of stock'}
            </div>
            <Horizontal />

            {isProductInCart ? (
              <>
                <p className="mb-2 text-slate-500 flex items-center gap-1">
                  <MdCheckCircle size={20} className="text-teal-400" />
                  <span>Product added in cart</span>
                </p>
                <div>
                  <Button
                    className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => {
                      router.push('/cart');
                    }}
                  >
                    View Cart
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <SetQuantity
                    cartProduct={cartProduct}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease}
                  />
                </div>
                <Horizontal />
                <div>
                  <Button
                    type="submit"
                    className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => cart.addItem(cartProduct)}
                  >
                    Add to cart
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Prooduct Support */}
      <div className="flex flex-col gap-4">
        {productSupport?.map((item, index) => (
          <ProductSupportItem
            key={index}
            Icon={item.Icon}
            firstContent={item.firstContent}
            secondContent={item.secondContent}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
