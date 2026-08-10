import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { fetchHotels } from '@/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { HOTELS } from '@/constants/queryKey';
import type { HotelFilterType, HotelSearchPayloadType } from '@/types';

export default function useHotelList() {
  const [appliedFilter, setAppliedFilter] = useState<HotelFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const payload: HotelSearchPayloadType = useMemo(
    () => ({
      page: page - 1,
      count: pageSize.toString(),
      key: appliedFilter?.searchKey.trim().toLowerCase() ?? '',
      area: appliedFilter?.area?.label || '',
      stars: appliedFilter?.hotelStars ?? [true, true, true, true, true],
    }),
    [page, pageSize, appliedFilter],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: [HOTELS, payload],
    queryFn: () => fetchHotels(payload),
    enabled: appliedFilter !== null,
  });

  const onSearch = (nextFilter: HotelFilterType) => {
    setPage(1);
    setAppliedFilter(nextFilter);
  };

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    appliedFilter,
    onSearch,
    data,
    isLoading,
    error,
  };
}
