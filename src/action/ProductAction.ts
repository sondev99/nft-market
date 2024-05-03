'use server';
import productApi from '@/apis/productApi';
import { revalidateTag } from 'next/cache';

export const getProductByCategory = async (categoryId: string | undefined) => {
  revalidateTag('list-users');
  return productApi.getProductByCategory(categoryId);
};

export const getProductById = async (productId: string | undefined) => {
  revalidateTag('list-users');
  return productApi.getById(productId);
};
