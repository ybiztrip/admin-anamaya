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

    let addressText = data.address || '';

    try {
      const parsed = JSON.parse(data.address);
      if (Array.isArray(parsed)) {
        addressText = parsed.join('\n');
      }
    } catch {
      addressText = data.address;
    }

    form.setFieldsValue({
      ...data,
      addressText,
    });
  }, [data, form]);

  const onFinish = (values: HotelOpenSearchFormValues) => {
    const lines = values.addressText
      ? values.addressText
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      : [];

    const payload: HotelOpenSearchType = {
      id: values.id,
      name: values.name,
      star: values.star,
      estimationPrice: values.estimationPrice,
      address: JSON.stringify(lines),
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
            <Form.Item
              label="Star"
              name="star"
              rules={[{ required: true, message: 'Star is required' }]}
            >
              <InputNumber min={0} max={5} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Estimation Price"
              name="estimationPrice"
              rules={[{ required: true, message: 'Estimation price is required' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Space>
          <Form.Item
            label="Address"
            name="addressText"
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <TextArea rows={3} placeholder="One line per address line" />
          </Form.Item>
          <Space size={16} wrap className="w-full">
            <Form.Item
              label="Province"
              name="province"
              rules={[{ required: true, message: 'Province is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'City is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country Code"
              name="countryCode"
              rules={[{ required: true, message: 'Country code is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: 'Postal code is required' }]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Space size={16} wrap className="w-full">
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: 'Latitude is required' }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: 'Longitude is required' }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label="Rank"
              name="rank"
              rules={[{ required: true, message: 'Rank is required' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Accommodation Type"
              name="accommodationType"
              rules={[{ required: true, message: 'Accommodation type is required' }]}
            >
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
