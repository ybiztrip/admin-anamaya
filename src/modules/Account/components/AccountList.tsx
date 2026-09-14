import { Card, Col, Input, Row, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';

import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import type { AccountType } from '@/types';

import useAccountList from '../hooks/useAccountList';

type AccountListProps = Readonly<{
  onOpenAccountDetail: (account: AccountType) => void;
}>;

function AccountList({ onOpenAccountDetail }: AccountListProps) {
  const { data, isLoading, error } = useAccountList();
  const [nameQuery, setNameQuery] = useState('');
  const [legalNameQuery, setLegalNameQuery] = useState('');

  const filteredList = useMemo(() => {
    const list = data?.data ?? [];
    const nameKey = nameQuery.trim().toLowerCase();
    const legalNameKey = legalNameQuery.trim().toLowerCase();

    if (!nameKey && !legalNameKey) return list;

    return list.filter((account) => {
      const name = (account.name ?? '').toLowerCase();
      const legalName = (account.legalName ?? '').toLowerCase();

      return (
        (!nameKey || name.includes(nameKey)) && (!legalNameKey || legalName.includes(legalNameKey))
      );
    });
  }, [data?.data, nameQuery, legalNameQuery]);

  return (
    <>
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Input
              placeholder="Name Keyword"
              value={nameQuery}
              allowClear
              onChange={(e) => setNameQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              placeholder="Legal Name Keyword"
              value={legalNameQuery}
              allowClear
              onChange={(e) => setLegalNameQuery(e.target.value)}
            />
          </Col>
        </Row>
      </Card>
      {error && (
        <div className="text-center text-sm text-red-500 mb-4 mt-4">
          {error?.message ?? DEFAULT_ERROR_MESSAGE}
        </div>
      )}
      <Table
        rowKey="id"
        className="mt-4"
        loading={isLoading}
        dataSource={filteredList}
        scroll={{ x: 'max-content' }}
        pagination={false}
        onRow={(record: AccountType) => ({
          onClick: () => onOpenAccountDetail(record),
        })}
        rowClassName="cursor-pointer"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Legal Name',
            dataIndex: 'legalName',
            key: 'legalName',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
              <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
            ),
          },
        ]}
      />
    </>
  );
}

export default AccountList;
