import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, Typography } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Layout from '@/components/Layout';
import { PROVIDER_ENABLEMENT_PATH } from '@/constants/routePath';
import type { AccountType } from '@/types';

import ProviderConfig from './components/ProviderConfig';

const { Title } = Typography;
type ProviderDetailLocationState = {
  account?: AccountType;
};

export default function ProviderDetailView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { id: accountId } = useParams<{ id: string }>();
  useEffect(() => {
    if (!accountId) navigate(PROVIDER_ENABLEMENT_PATH, { replace: true });
  }, [accountId, navigate]);

  const account = (location.state as ProviderDetailLocationState | null)?.account;
  const accountLabel = (() => {
    if (!account) return accountId;
    return account.legalName;
  })();

  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'hotel' ? 'hotel' : 'flight';

  useEffect(() => {
    if (tabParam === 'flight' || tabParam === 'hotel') return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('tab', 'flight');
        return next;
      },
      { replace: true, state: location.state },
    );
  }, [location.state, tabParam, setSearchParams]);

  if (!accountId) return null;

  return (
    <Layout>
      <Button
        className="mb-4"
        color="primary"
        variant="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(PROVIDER_ENABLEMENT_PATH)}
      >
        Back
      </Button>
      <Card>
        <Title level={4}>Provider Enablement</Title>
        <Typography.Text type="secondary">{accountLabel}</Typography.Text>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setSearchParams(
              (prev) => {
                const next = new URLSearchParams(prev);
                next.set('tab', key);
                return next;
              },
              { state: location.state },
            );
          }}
          items={[
            {
              key: 'flight',
              label: 'Flight',
              children:
                activeTab === 'flight' ? (
                  <ProviderConfig accountId={accountId} category="flight" />
                ) : null,
            },
            {
              key: 'hotel',
              label: 'Hotel',
              children:
                activeTab === 'hotel' ? (
                  <ProviderConfig accountId={accountId} category="hotel" />
                ) : null,
            },
          ]}
        />
      </Card>
    </Layout>
  );
}
