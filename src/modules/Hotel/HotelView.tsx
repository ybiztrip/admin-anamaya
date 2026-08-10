import { Card, Typography } from 'antd';

import Layout from '@/components/Layout';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';

import HotelFilterForm from './components/HotelFilterForm';
import HotelTable from './components/HotelTable';
import useHotelList from './hooks/useHotelList';

const { Title } = Typography;

export default function HotelView() {
  const { appliedFilter, onSearch, page, pageSize, setPage, setPageSize, data, isLoading, error } =
    useHotelList();

  const list = data?.data ?? [];
  const total = data?.totalElements ?? list.length;

  return (
    <Layout>
      <Title level={4}>Hotel</Title>
      <Card size="small" className="mb-4">
        <HotelFilterForm onSearch={onSearch} loading={isLoading} />
      </Card>
      {error && (
        <div className="text-center text-sm text-red-500 mb-4">
          {error?.message ?? DEFAULT_ERROR_MESSAGE}
        </div>
      )}
      {appliedFilter && (
        <HotelTable
          data={list}
          loading={isLoading}
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={(nextPage, nextSize) => {
            setPage(nextPage);
            if (nextSize !== pageSize) {
              setPageSize(nextSize);
            }
          }}
        />
      )}
    </Layout>
  );
}
