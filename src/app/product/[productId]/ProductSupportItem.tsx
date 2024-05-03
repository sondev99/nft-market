import React from 'react';
import { IconType } from 'react-icons';
import { ProductSupportItemProps } from './ProductDetail';

// type ProductSupportItemProps = {
//   Icon: IconType;
//   firstContent: string | null;
//   secondContent: string | null;
// };

const ProductSupportItem = ({
  firstContent,
  Icon,
  secondContent,
}: ProductSupportItemProps) => {
  return (
    <div className="border-solid border-[1px] border-gray-300 flex items-center p-2">
      <div className="p-2 rounded-full bg-gray-300">
        <Icon size={20} />
      </div>
      <div className="ml-4">
        <span className="text-base font-medium">
          {firstContent}
          <span className="block text-sm text-slate-500 font-normal">
            {secondContent}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProductSupportItem;
