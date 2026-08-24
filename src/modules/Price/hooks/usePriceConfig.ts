import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import {
  fetchFlightPriceConfig,
  fetchHotelPriceConfig,
  updateFlightPriceConfig,
  updateHotelPriceConfig,
} from '@/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { PRICES } from '@/constants/queryKey';
import type { PriceFetchParamsType, PriceType } from '@/types';

type UsePriceConfigParams = PriceFetchParamsType & {
  category: 'flight' | 'hotel';
};

export default function usePriceConfig({ accountId, category }: UsePriceConfigParams) {
  const queryClient = useQueryClient();
  const queryKey = [PRICES, accountId, category];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => {
      const params: PriceFetchParamsType = { accountId };
      return category === 'hotel' ? fetchHotelPriceConfig(params) : fetchFlightPriceConfig(params);
    },
    enabled: Boolean(accountId && category),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: PriceType) => {
      return category === 'hotel'
        ? updateHotelPriceConfig(payload)
        : updateFlightPriceConfig(payload);
    },
    onError: (e: any) => {
      message.error(e?.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
    },
  });

  const submitUpdatePriceConfig = async (payload: PriceType) => {
    const res = await updateMutation.mutateAsync(payload);
    if (!res.success) {
      message.error(res.message);
      throw new Error(res.message);
    }
    message.success('Price config updated');
    await queryClient.invalidateQueries({ queryKey });
    return res;
  };

  return {
    data,
    isLoading,
    error,
    isUpdating: updateMutation.isPending,
    submitUpdatePriceConfig,
  };
}
