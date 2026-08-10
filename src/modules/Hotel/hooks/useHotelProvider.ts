import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchHotelProvider, updateHotelProviderIds } from '@/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';

export default function useHotelProvider(propertyId: string) {
  const {
    data,
    isLoading,
    error,
    refetch: refetchProvider,
  } = useQuery({
    queryKey: ['hotel-provider', propertyId],
    queryFn: () => fetchHotelProvider(propertyId),
    enabled: Boolean(propertyId),
  });

  const { mutateAsync: updateProvider, isPending: isUpdating } = useMutation({
    mutationFn: (providerPropertyId: number[]) =>
      updateHotelProviderIds(propertyId, {
        providerPropertyId,
      }),
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
