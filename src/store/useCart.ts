import { CartProductType } from '@/app/product/[productId]/ProductDetail';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export type CartItem = {
  product: Product;
};

type CartState = {
  cartQty: number;
  cartProducts: CartProductType[];
  totalPrice: number;
  paymentIntent: string | null;
  handlePaymentIntent: (value: string | null) => void;
  addItem: (product: CartProductType) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  handleChangeCart: (updateCart: CartProductType[]) => void;
  getTotals: () => void;
  setTotal: (total: number) => void;
  setQty: (qty: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      paymentIntent: null,
      totalPrice: 0,
      cartQty: 0,
      cartProducts: [],
      handlePaymentIntent: (value: string | null) =>
        set(() => {
          return { paymentIntent: value };
        }),
      addItem: (product: CartProductType) =>
        set((state) => {
          toast.success('Product added to cart');
          return { cartProducts: [...state.cartProducts, product] };
        }),
      removeItem: (id) =>
        set((state) => {
          toast.success('Remove product from cart');
          return {
            cartProducts: state.cartProducts.filter((item) => item.id !== id),
          };
        }),
      clearCart: () =>
        set(() => {
          toast.success('Clear cart successfully');

          return { cartProducts: [] };
        }),
      handleChangeCart: (updateCart: CartProductType[]) => {
        return { cartProducts: [...updateCart] };
      },
      getTotals: () =>
        set((state) => {
          useEffect(() => {
            const totalFun = () => {
              console.log(state);
              if (state.cartProducts) {
                const { total, qty } = state?.cartProducts.reduce(
                  (acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;

                    return acc;
                  },
                  {
                    total: 0,
                    qty: 0,
                  }
                );
                return { totalPrice: total, cartQty: qty };
              }
            };
            totalFun();
          }, [state.cartProducts]);
          return { totalPrice: 0, cartQty: 0 };
        }),
      setTotal: (total: number) => {
        set(() => {
          return { totalPrice: total };
        });
      },
      setQty: (qty: number) => {
        set(() => {
          return { cartQty: qty };
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
