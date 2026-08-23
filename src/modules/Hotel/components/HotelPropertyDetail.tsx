import { Card, Col, Form, Input, InputNumber, Row, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { HotelPropertyDetailType } from '@/types';

dayjs.extend(customParseFormat);

type HotelPropertyDetailFormValues = {
  name: string;
  latitude: number | null;
  longitude: number | null;
  lineData: string;
  city: string;
  province: string;
  country: string;
  postalCode: number | null;
  star: number | null;
  accommodationType: string;
  ranking: string;
  checkOutInfo: Dayjs | null;
  checkInBeginTime: Dayjs | null;
  checkInMinAge: number | null;
  checkInInstructions: string;
  checkInSpecialInstructions: string;
  feesOptional: string;
  feesMandatory: string;
  policiesInstructions: string;
  policiesKnowBeforeYouGo: string;
  status: string;
};

export default function HotelPropertyDetail({
  hotel,
}: Readonly<{ hotel: HotelPropertyDetailType }>) {
  const summary = hotel?.propertySummary;

  const parseTime = (value?: string | null): Dayjs | null => {
    if (!value) return null;
    const t = dayjs(value, ['h:mm A', 'h:mm a'], true);
    return t.isValid() ? t : null;
  };

  const initialValues: HotelPropertyDetailFormValues = {
    name: summary?.name ?? '',
    latitude: Number(summary?.geoLocation?.lat),
    longitude: Number(summary?.geoLocation?.lon),
    lineData: summary?.localAddress?.lines?.join('\n') ?? '',
    city: summary?.localAddress?.city ?? '',
    province: summary?.localAddress?.province ?? '',
    country: summary?.localAddress?.country ?? '',
    postalCode: Number(summary?.localAddress?.postalCode),
    star: Number(summary?.starRating),
    accommodationType: summary?.accommodationType ?? '',
    ranking: '',
    checkOutInfo: parseTime(hotel?.checkOutInfo?.time),
    checkInBeginTime: parseTime(hotel?.checkInInfo?.begin_time),
    checkInMinAge: hotel?.checkInInfo?.min_age ?? null,
    checkInInstructions: hotel?.checkInInfo?.instructions ?? '',
    checkInSpecialInstructions: hotel?.checkInInfo?.special_instructions ?? '',
    feesOptional: hotel?.feesInfo?.optional ?? '',
    feesMandatory: hotel?.feesInfo?.mandatory ?? '',
    policiesInstructions: hotel?.policiesInfo?.instructions ?? '',
    policiesKnowBeforeYouGo: hotel?.policiesInfo?.know_before_you_go ?? '',
    status: hotel?.status ?? '',
  };

  return (
    <Form<HotelPropertyDetailFormValues>
      key={hotel.propertyId}
      layout="vertical"
      initialValues={initialValues}
    >
      <div className="flex flex-col gap-4">
        <Card size="small" title="Property Info">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Latitude" name="latitude">
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Longitude" name="longitude">
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Line Data" name="lineData">
                <TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Province" name="province">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Country" name="country">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Postal Code" name="postalCode">
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item label="Star" name="star">
                <InputNumber min={1} max={5} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Accommodation Type" name="accommodationType">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Ranking" name="ranking">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Status" name="status">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Check-out Info">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Time" name="checkOutInfo">
                <TimePicker use12Hours format="h:mm a" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Check-in Info">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Begin Time" name="checkInBeginTime">
                <TimePicker use12Hours format="h:mm a" className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Min Age" name="checkInMinAge">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Special Instructions" name="checkInSpecialInstructions">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Instructions" name="checkInInstructions">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Fees Info">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Optional" name="feesOptional">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Mandatory" name="feesMandatory">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Policies Info">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Instructions" name="policiesInstructions">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Know Before You Go" name="policiesKnowBeforeYouGo">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </div>
    </Form>
  );
}
