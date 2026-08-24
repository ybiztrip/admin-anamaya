import { useQuery } from '@tanstack/react-query';

import { fetchAccounts } from '@/api';
import { ACCOUNTS } from '@/constants/queryKey';

export default function useAccountList() {
  const { data, isLoading, error } = useQuery({
    queryKey: [ACCOUNTS],
    queryFn: () => fetchAccounts(),
  });

  return {
    data,
    isLoading,
    error,
  };
}
