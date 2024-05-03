export const formatPrice = (amout: number | undefined) => {
  if (amout)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amout);
};

export const caculateSalePrice = (price: number, discount: number) => {
  return (1 - (discount ?? 0) / 100) * (price ?? 0);
};
