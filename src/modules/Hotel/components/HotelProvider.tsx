import { Button, Input, message, Table } from 'antd';
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
};

export default function HotelProvider({ propertyId }: HotelProviderProps) {
  const { providerData, isLoading, updateProvider, isUpdating } = useHotelProvider(propertyId);
  const [providerPropertyIdDraft, setProviderPropertyIdDraft] = useState<Record<number, string>>(
    {},
  );
  const [providerAliasNameDraft, setProviderAliasNameDraft] = useState<Record<number, string>>({});

  const rows = useMemo<HotelProviderRowType[]>(
    () =>
      providerData.map((provider) => ({
        ...provider,
        providerPropertyIdInput:
          providerPropertyIdDraft[provider.id] ?? provider.providerPropertyId ?? '',
        providerAliasNameInput:
          providerAliasNameDraft[provider.id] ?? provider.providerAliasName ?? '',
      })),
    [providerData, providerPropertyIdDraft, providerAliasNameDraft],
  );

  const isDirty = useMemo(
    () =>
      rows.some((row) => {
        const serverRow = providerData.find((provider) => provider.id === row.id);
        const serverPropertyId = serverRow?.providerPropertyId ?? '';
        const serverAliasName = serverRow?.providerAliasName ?? '';

        return (
          row.providerPropertyIdInput.trim() !== serverPropertyId ||
          row.providerAliasNameInput.trim() !== serverAliasName
        );
      }),
    [providerData, rows],
  );

  const onSave = async () => {
    const hasInvalidInput = rows.some((row) => {
      const trimmed = row.providerPropertyIdInput.trim();
      return trimmed.length === 0 || Number.isNaN(Number(trimmed));
    });

    if (hasInvalidInput) {
      message.error('Provider Property ID is required and must be a number.');
      return;
    }

    const hasInvalidAlias = rows.some((row) => row.providerAliasNameInput.trim().length === 0);
    if (hasInvalidAlias) {
      message.error('Provider Alias Name is required.');
      return;
    }

    const payload: HotelProviderUpdatePayloadType = rows.map((row) => ({
      provider: row.provider,
      providerPropertyId: Number(row.providerPropertyIdInput.trim()),
      providerAliasName: row.providerAliasNameInput.trim(),
    }));

    await updateProvider(payload);
    setProviderPropertyIdDraft({});
    setProviderAliasNameDraft({});
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
