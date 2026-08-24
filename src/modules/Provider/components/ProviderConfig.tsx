import { Empty, Form, Spin, Switch } from 'antd';
import { useEffect, useMemo } from 'react';

import { PROVIDER_NAMES } from '@/constants/common';

import useProviderConfig from '../hooks/useProviderConfig';

type ProviderConfigProps = Readonly<{
  accountId: string;
  category: string;
}>;

export default function ProviderConfig({ accountId, category }: ProviderConfigProps) {
  const { data, isLoading, isUpdating, submitUpdateProvider } = useProviderConfig({
    accountId,
    category,
  });
  const [form] = Form.useForm();

  const providers = useMemo(() => data?.data ?? [], [data]);
  const isEmpty = !isLoading && providers.length === 0;
  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      items: providers.map((p) => ({
        provider: p.provider,
        enabled: p.status === 'enabled',
      })),
    });
  }, [data, form, providers]);

  return (
    <Spin spinning={isLoading}>
      {isEmpty ? (
        <div className="py-10">
          <Empty description="Data not found" />
        </div>
      ) : (
        <Form form={form} layout="horizontal" className="mt-4">
          {providers.map((p, index) => (
            <Form.Item
              key={p.provider}
              label={PROVIDER_NAMES[p.provider as keyof typeof PROVIDER_NAMES] ?? p.provider}
              style={{ marginBottom: 16 }}
            >
              <Form.Item name={['items', index, 'enabled']} valuePropName="checked" noStyle>
                <Switch
                  disabled={isLoading || isUpdating}
                  onChange={async (checked) => {
                    const previous = form.getFieldValue(['items', index, 'enabled']);
                    form.setFieldValue(['items', index, 'enabled'], checked);
                    try {
                      await submitUpdateProvider(p.provider, checked ? 'enabled' : 'disabled');
                    } catch {
                      form.setFieldValue(['items', index, 'enabled'], previous);
                    }
                  }}
                />
              </Form.Item>
            </Form.Item>
          ))}
        </Form>
      )}
    </Spin>
  );
}
