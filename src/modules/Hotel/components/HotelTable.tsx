import { Table } from 'antd';

import type { HotelType } from '@/types';

type HotelListProps = {
  data: HotelType[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
};

function HotelList({ data, loading, total, page, pageSize, onPageChange }: HotelListProps) {
  const openHotelDetail = (hotel: HotelType) => {
    console.log(hotel);
  };

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={data}
      scroll={{ x: 'max-content' }}
      pagination={{
        current: page,
        pageSize,
        total,
        showSizeChanger: true,
        onChange: onPageChange,
      }}
      onRow={(record) => ({
        onClick: () => openHotelDetail(record),
      })}
      rowClassName="cursor-pointer"
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Star',
          dataIndex: 'star',
          key: 'star',
        },
        {
          title: 'Type',
          dataIndex: 'accommodationType',
          key: 'accommodationType',
        },
        {
          title: 'Address',
          dataIndex: 'lineData',
          key: 'lineData',
          render: (lineData: string[]) => {
            return lineData?.length > 0 ? lineData.join(', ') : '-';
          },
        },
      ]}
    />
  );
}

export default HotelList;
