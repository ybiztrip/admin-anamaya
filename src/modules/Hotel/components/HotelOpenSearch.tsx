import { Button, Card, Form, Input, InputNumber, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

import type { HotelOpenSearchType } from '@/types';

import useHotelOpenSearch from '../hooks/useHotelOpenSearch';

type HotelOpenSearchFormValues = HotelOpenSearchType & {
  addressText: string;
};

type HotelOpenSearchProps = Readonly<{
  propertyId: string;
}>;

export default function HotelOpenSearch({ propertyId }: HotelOpenSearchProps) {
  const [form] = Form.useForm<HotelOpenSearchFormValues>();
  const { data, isLoading, isSaving, saveOpenSearch } = useHotelOpenSearch(propertyId);

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      ...data,
      addressText: data.address?.join('\n') ?? '',
    });
  }, [data, form]);

  const onFinish = (values: HotelOpenSearchFormValues) => {
    const payload: HotelOpenSearchType = {
      id: values.id,
      name: values.name,
      star: values.star,
      estimationPrice: values.estimationPrice,
      address: values.addressText
        ? values.addressText
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
        : [],
      province: values.province,
      city: values.city,
      countryCode: values.countryCode,
      postalCode: values.postalCode,
      latitude: values.latitude,
      longitude: values.longitude,
      rank: values.rank,
      accommodationType: values.accommodationType,
    };

    void saveOpenSearch(payload);
  };

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin />
      </div>
    );
  }

  return (
    <Card size="small">
      <Form<HotelOpenSearchFormValues> layout="vertical" form={form} onFinish={onFinish}>
        <Space direction="vertical" size={16} className="w-full">
          <Space size={16} wrap className="w-full">
            <Form.Item label="Property ID" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Star" name="star">
              <InputNumber min={0} max={5} className="w-full" />
            </Form.Item>
            <Form.Item label="Estimation Price" name="estimationPrice">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Space>

          <Form.Item label="Address" name="addressText">
            <TextArea rows={3} placeholder="One line per address line" />
          </Form.Item>

          <Space size={16} wrap className="w-full">
            <Form.Item label="Province" name="province">
              <Input />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
            <Form.Item label="Country Code" name="countryCode">
              <Input />
            </Form.Item>
            <Form.Item label="Postal Code" name="postalCode">
              <Input />
            </Form.Item>
          </Space>

          <Space size={16} wrap className="w-full">
            <Form.Item label="Latitude" name="latitude">
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item label="Longitude" name="longitude">
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item label="Rank" name="rank">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Accommodation Type" name="accommodationType">
              <Input />
            </Form.Item>
          </Space>

          <div className="flex justify-end">
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save'}
              </Button>
            </Form.Item>
          </div>
        </Space>
      </Form>
    </Card>
  );
}
