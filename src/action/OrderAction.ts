'use server';

import orderApi from '@/apis/orderApi';
import { revalidateTag } from 'next/cache';

export const getOrderOfCurrentUser = async () => {
  revalidateTag('list-orders');
  return orderApi.getOrderOfCurrentUser();
};
