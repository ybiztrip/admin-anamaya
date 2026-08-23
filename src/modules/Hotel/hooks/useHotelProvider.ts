import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchHotelProvider, updateHotelProvider } from '@/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { HOTEL_PROVIDER } from '@/constants/queryKey';
import type { HotelProviderUpdatePayloadType } from '@/types';

export default function useHotelProvider(propertyId: string) {
  const {
    data,
    isLoading,
    error,
    refetch: refetchProvider,
  } = useQuery({
    queryKey: [HOTEL_PROVIDER, propertyId],
    queryFn: () => fetchHotelProvider(propertyId),
    enabled: Boolean(propertyId),
  });

  const { mutateAsync: updateProvider, isPending: isUpdating } = useMutation({
    mutationFn: (payload: HotelProviderUpdatePayloadType) =>
      updateHotelProvider(propertyId, payload),
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message || DEFAULT_ERROR_MESSAGE);
        return;
      }

      message.success('Provider IDs updated');
      refetchProvider();
    },
    onError: (e: any) => {
      message.error(e?.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
    },
  });

  return {
    providerData: data?.data ?? [],
    isLoading,
    error,
    updateProvider,
    isUpdating,
  };
}
