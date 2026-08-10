import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '@/components/Layout';
import { HOTEL_PATH } from '@/constants/routePath';

import HotelDetail from './components/HotelDetail';
import useHotelPropertyDetail from './hooks/useHotelPropertyDetail';

export default function HotelDetailView() {
  const navigate = useNavigate();

  const { id: propertyId } = useParams<{ id: string }>();

  const {
    data: propertyDetailData,
    isLoading: propertyDetailLoading,
    getHotelPropertyDetails,
  } = useHotelPropertyDetail({ propertyId: propertyId ?? '' });

  useEffect(() => {
    if (propertyId) {
      getHotelPropertyDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const hotel = propertyDetailData?.data?.propertyDatas?.[0];

  return (
    <Layout>
      <Row className="mb-4">
        <Col flex="300px">
          <Button
            color="primary"
            variant="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(HOTEL_PATH)}
          >
            Back
          </Button>
        </Col>
      </Row>
      {propertyDetailLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin />
        </div>
      ) : (
        hotel && (
          <div className="mb-4">
            <HotelDetail hotel={hotel} />
          </div>
        )
      )}
    </Layout>
  );
}
