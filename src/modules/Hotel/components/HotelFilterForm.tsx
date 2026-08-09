import { StarFilled } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Space } from 'antd';

import SelectHotelGeo from '@/components/Select/SelectHotelGeo';
import type { HotelFilterType } from '@/types';

type HotelFilterFormProps = Readonly<{
  onSearch: (value: HotelFilterType) => void;
  loading?: boolean;
}>;

export default function HotelFilterForm({ onSearch, loading }: HotelFilterFormProps) {
  const [form] = Form.useForm<HotelFilterType>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        searchKey: '',
        area: null,
        hotelStars: [true, true, true, true, true],
      }}
      onFinish={onSearch}
      className="mb-4"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="searchKey" label="Hotel Name">
            <Input placeholder="Hotel Keyword" allowClear onPressEnter={() => form.submit()} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="area"
            label="Area"
            rules={[{ required: true, message: 'Area required' }]}
          >
            <SelectHotelGeo placeholder="Area" labelInValue />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item
            label="Hotel Star"
            name="hotelStars"
            rules={[{ required: true, message: 'Hotel Class required' }]}
            getValueFromEvent={(checkedValues: string[]) =>
              [1, 2, 3, 4, 5].map((n) =>
                checkedValues.includes(String(n)),
              ) as HotelFilterType['hotelStars']
            }
            getValueProps={(stars?: HotelFilterType['hotelStars']) => ({
              value: (stars ?? [true, true, true, true, true]).flatMap((isSelected, index) =>
                isSelected ? [String(index + 1)] : [],
              ),
            })}
          >
            <Checkbox.Group>
              <Space size={16} wrap>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Checkbox
                    key={n}
                    value={String(n)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {Array.from({ length: n }, (_, star) => star + 1).map((star) => (
                      <StarFilled
                        key={star}
                        style={{
                          color: '#69A8FF',
                          fontSize: 16,
                        }}
                      />
                    ))}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" loading={loading} className="mt-4">
        Search
      </Button>
    </Form>
  );
}
