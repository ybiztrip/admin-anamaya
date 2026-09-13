import { Button, Input, message, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import type { HotelProviderType, HotelProviderUpdatePayloadType } from '@/types';

import useHotelProvider from '../hooks/useHotelProvider';

type HotelProviderProps = Readonly<{
  propertyId: string;
}>;

type HotelProviderRowType = HotelProviderType & {
  providerPropertyIdInput: string;
  providerAliasNameInput: string;
  statusInput: 'active' | 'inactive';
};

export default function HotelProvider({ propertyId }: HotelProviderProps) {
  const { providerData, isLoading, updateProvider, isUpdating } = useHotelProvider(propertyId);
  const [providerPropertyIdDraft, setProviderPropertyIdDraft] = useState<Record<number, string>>(
    {},
  );
  const [providerAliasNameDraft, setProviderAliasNameDraft] = useState<Record<number, string>>({});
  const [providerStatusDraft, setProviderStatusDraft] = useState<
    Record<number, 'active' | 'inactive'>
  >({});

  const normalizeStatus = (status: string | null | undefined): 'active' | 'inactive' =>
    status === 'inactive' ? 'inactive' : 'active';

  const initialProviderById = useMemo(() => {
    return new Map(providerData.map((provider) => [provider.id, provider]));
  }, [providerData]);

  const rows = useMemo<HotelProviderRowType[]>(
    () =>
      providerData.map((provider) => ({
        ...provider,
        providerPropertyIdInput:
          providerPropertyIdDraft[provider.id] ?? provider.providerPropertyId ?? '',
        providerAliasNameInput:
          providerAliasNameDraft[provider.id] ?? provider.providerAliasName ?? '',
        statusInput: providerStatusDraft[provider.id] ?? normalizeStatus(provider.status),
      })),
    [providerData, providerPropertyIdDraft, providerAliasNameDraft, providerStatusDraft],
  );

  const dirtyRows = useMemo(() => {
    return rows.filter((row) => {
      const initialRow = initialProviderById.get(row.id);
      const initialPropertyId = initialRow?.providerPropertyId ?? '';
      const initialAliasName = initialRow?.providerAliasName ?? '';
      const initialStatus = normalizeStatus(initialRow?.status);

      return (
        row.providerPropertyIdInput.trim() !== initialPropertyId ||
        row.providerAliasNameInput.trim() !== initialAliasName ||
        row.statusInput !== initialStatus
      );
    });
  }, [rows, initialProviderById]);

  const isDirty = dirtyRows.length > 0;

  const onSave = async () => {
    if (dirtyRows.length === 0) return;

    const isInvalidPropertyId = dirtyRows.some((row) => {
      const trimmed = row.providerPropertyIdInput.trim();
      if (trimmed.length === 0) return true;
      return Number.isNaN(Number(trimmed));
    });
    if (isInvalidPropertyId) {
      message.error('Provider Property ID is required and must be a number.');
      return;
    }

    const isInvalidAliasName = dirtyRows.some((row) => row.providerAliasNameInput.trim().length === 0);
    if (isInvalidAliasName) {
      message.error('Provider Alias Name is required.');
      return;
    }

    const payload: HotelProviderUpdatePayloadType = dirtyRows.map((row) => ({
      provider: row.provider,
      providerPropertyId: Number(row.providerPropertyIdInput.trim()),
      providerAliasName: row.providerAliasNameInput.trim(),
      status: row.statusInput,
    }));

    await updateProvider(payload);
    setProviderPropertyIdDraft({});
    setProviderAliasNameDraft({});
    setProviderStatusDraft({});
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={rows}
        pagination={false}
        scroll={{ x: 920 }}
        locale={{ emptyText: 'Provider data not available.' }}
        columns={[
          {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
            width: 160,
          },
          {
            title: 'Provider Alias Name',
            dataIndex: 'providerAliasNameInput',
            key: 'providerAliasNameInput',
            width: 260,
            render: (_: string, record: HotelProviderRowType) => (
              <Input
                value={record.providerAliasNameInput}
                onChange={(e) => {
                  setProviderAliasNameDraft((prevDraft) => ({
                    ...prevDraft,
                    [record.id]: e.target.value,
                  }));
                }}
                placeholder="Input provider alias name"
              />
            ),
          },
          {
            title: 'Provider Property ID',
            dataIndex: 'providerPropertyIdInput',
            key: 'providerPropertyIdInput',
            width: 240,
            render: (_: string, record: HotelProviderRowType) => (
              <Input
                value={record.providerPropertyIdInput}
                onChange={(e) => {
                  setProviderPropertyIdDraft((prevDraft) => ({
                    ...prevDraft,
                    [record.id]: e.target.value,
                  }));
                }}
                placeholder="Input provider property id"
              />
            ),
          },
          {
            title: 'Status',
            dataIndex: 'statusInput',
            key: 'statusInput',
            width: 140,
            render: (_: string, record: HotelProviderRowType) => (
              <Select
                value={record.statusInput}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                onChange={(value) => {
                  setProviderStatusDraft((prevDraft) => ({
                    ...prevDraft,
                    [record.id]: value,
                  }));
                }}
                style={{ width: '100%' }}
              />
            ),
          },
          {
            title: 'Updated On',
            dataIndex: 'updatedOn',
            key: 'updatedOn',
            width: 220,
            render: (updatedOn: number) => (
              <span>{updatedOn ? dayjs(updatedOn).format('DD MMM YYYY HH:mm') : '-'}</span>
            ),
          },
        ]}
      />

      <div className="flex justify-end">
        <Button
          type="primary"
          loading={isUpdating}
          disabled={!isDirty || rows.length === 0}
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
