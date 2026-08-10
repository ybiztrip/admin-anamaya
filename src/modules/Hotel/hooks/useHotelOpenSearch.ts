import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchHotelOpenSearch, updateHotelOpenSearch } from '@/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { HOTEL_OPEN_SEARCH } from '@/constants/queryKey';
import type { HotelOpenSearchType } from '@/types';

export default function useHotelOpenSearch(propertyId: string) {
  const {
    data,
    isLoading,
    error,
    refetch: refetchOpenSearch,
  } = useQuery({
    queryKey: [HOTEL_OPEN_SEARCH, propertyId],
    queryFn: () => fetchHotelOpenSearch(propertyId),
    enabled: Boolean(propertyId),
  });

  const { mutateAsync: saveOpenSearch, isPending: isSaving } = useMutation({
    mutationFn: (payload: HotelOpenSearchType) => updateHotelOpenSearch(propertyId, payload),
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message || DEFAULT_ERROR_MESSAGE);
        return;
      }

      message.success('Hotel Open Search updated');
      refetchOpenSearch();
    },
    onError: (e: any) => {
      message.error(e?.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
    },
  });

  return {
    data: data?.data ?? null,
    isLoading,
    error,
    isSaving,
    saveOpenSearch,
  };
}
