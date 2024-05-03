'use server';
import categoryApi from '@/apis/categoryApi';
import { revalidateTag } from 'next/cache';

export const getBaseCategoryAction = async () => {
  revalidateTag('list-users');
  return categoryApi.getBaseCategories();
};
