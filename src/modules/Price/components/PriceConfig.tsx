import { Button, Empty, Form, InputNumber, Space, Spin } from 'antd';
import { useEffect, useMemo } from 'react';

import type { PriceType } from '@/types';

import usePriceConfig from '../hooks/usePriceConfig';

type PriceConfigProps = Readonly<{
  accountId: string;
  category: 'flight' | 'hotel';
}>;

export default function PriceConfig({ accountId, category }: PriceConfigProps) {
  const [form] = Form.useForm();
  const { data, isLoading, isUpdating, submitUpdatePriceConfig } = usePriceConfig({
    accountId,
    category,
  });

  const priceConfigs = useMemo(() => data?.data ?? null, [data]);

  useEffect(() => {
    if (priceConfigs) {
      const values = {
        priceReduction: priceConfigs.priceReduction,
        priceAmplifier: priceConfigs.priceAmplifier,
        additionalFixedPrice: priceConfigs.additionalFixedPrice,
      };
      form.setFieldsValue(values);
      return;
    }

    form.setFieldsValue({
      priceReduction: 0,
      priceAmplifier: 0,
      additionalFixedPrice: 0,
    });
  }, [priceConfigs, form]);

  const isEmpty = !isLoading && !priceConfigs;

  const onFinish = async (values: any) => {
    const payload: PriceType = {
      accountId,
      priceReduction: values.priceReduction,
      priceAmplifier: values.priceAmplifier,
      additionalFixedPrice: values.additionalFixedPrice,
      status: priceConfigs?.status ?? 'active',
    };
    await submitUpdatePriceConfig(payload);
  };

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin />
      </div>
    );
  }

  return (
    <div className="mt-4">
      {isEmpty ? (
        <div className="py-6">
          <Empty description="Data not found" />
        </div>
      ) : null}

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Space size={16} wrap className="w-full">
          <Form.Item
            label="Price Reduction"
            name="priceReduction"
            rules={[{ required: true, message: 'Price reduction is required' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Price Amplifier"
            name="priceAmplifier"
            rules={[{ required: true, message: 'Price amplifier is required' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Additional Fixed Price"
            name="additionalFixedPrice"
            rules={[{ required: true, message: 'Additional fixed price is required' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <div className="flex justify-end">
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving…' : 'Save'}
              </Button>
            </Form.Item>
          </div>
        </Space>
      </Form>
    </div>
  );
}
