'use server';
import bannerApi from '@/apis/bannerApi';
import categoryApi from '@/apis/categoryApi';
import { revalidateTag } from 'next/cache';

export const getAllBanner = async () => {
  revalidateTag('list-banner');
  return bannerApi.getAllBanners();
};
