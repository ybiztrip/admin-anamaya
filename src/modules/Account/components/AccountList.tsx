import { Table } from 'antd';
import dayjs from 'dayjs';

import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import type { AccountType } from '@/types';

import useAccountList from '../hooks/useAccountList';

type AccountListProps = Readonly<{
  onOpenAccountDetail: (account: AccountType) => void;
}>;

function AccountList({ onOpenAccountDetail }: AccountListProps) {
  const { data, isLoading, error } = useAccountList();
  return (
    <>
      {error && (
        <div className="text-center text-sm text-red-500 mb-4">
          {error?.message ?? DEFAULT_ERROR_MESSAGE}
        </div>
      )}
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data ?? []}
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
          },
          {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (createdOn: number) => dayjs(createdOn).format('DD-MMM-YYYY HH:mm:ss'),
          },
          {
            title: 'Updated On',
            dataIndex: 'updatedOn',
            key: 'updatedOn',
            render: (updatedOn: number) => dayjs(updatedOn).format('DD-MMM-YYYY HH:mm:ss'),
          },
        ]}
      />
    </>
  );
}

export default AccountList;
