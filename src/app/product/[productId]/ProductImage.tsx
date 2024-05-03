import React from 'react';
import { CartProductType } from './ProductDetail';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ProductImageProps = {
  cartProduct: CartProductType;
  product: ProductResponse;
  handleImageSelect: (value: ImageUrl) => void;
};

const ProductImage = ({
  cartProduct,
  product,
  handleImageSelect,
}: ProductImageProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.imageUrls.map((imageUrl: ImageUrl, i) => {
          return (
            <div
              key={i}
              onClick={() => handleImageSelect(imageUrl)}
              className={`relative w-[80%] aspect-square rounded-md border-teal-300 ${
                cartProduct.selectedImg.id === imageUrl.id
                  ? 'border-[1.5px]'
                  : 'border-none'
              }`}
            >
              <Image
                src={imageUrl.imageUrl}
                alt="preview image"
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square ">
        <Image
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          src={cartProduct.selectedImg.imageUrl}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
