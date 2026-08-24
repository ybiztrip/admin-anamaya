import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchProviders, saveProviders } from '@/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { PROVIDERS } from '@/constants/queryKey';
import type { ProviderFetchPayloadType, ProviderType } from '@/types';

export default function useProviderConfig({ accountId, category }: ProviderFetchPayloadType) {
  const queryClient = useQueryClient();
  const queryKey = [PROVIDERS, accountId, category];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchProviders({ accountId, category }),
    enabled: Boolean(accountId && category),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: ProviderType) => saveProviders(payload),
    onError: (e: any) => {
      message.error(e?.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
    },
  });

  const submitUpdateProvider = async (provider: string, status: string) => {
    const payload: ProviderType = {
      accountId,
      provider,
      category,
      status,
    };
    const res = await updateMutation.mutateAsync(payload);
    if (!res.success) {
      message.error(res.message);
      throw new Error(res.message);
    }
    message.success('Account provider updated');
    await queryClient.invalidateQueries({ queryKey });
    return res;
  };

  return {
    data,
    isLoading,
    error,
    isUpdating: updateMutation.isPending,
    submitUpdateProvider,
  };
}
