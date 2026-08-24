export type PriceType = {
  accountId: string;
  priceReduction: number;
  priceAmplifier: number;
  additionalFixedPrice: number;
  status: 'inactive' | 'active';
};

export type PriceFetchParamsType = {
  accountId: string;
};
