import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import { getProviderEnablementDetailPath } from '@/constants/routePath';
import AccountList from '@/modules/Account/components/AccountList';
import type { AccountType } from '@/types';

const { Title } = Typography;

export default function ProviderView() {
  const navigate = useNavigate();

  const openAccountProviderEnablementDetail = (account: AccountType) => {
    navigate(getProviderEnablementDetailPath(account.id), { state: { account } });
  };
  return (
    <Layout>
      <Title level={4}>Provider Enablement</Title>
      <AccountList onOpenAccountDetail={openAccountProviderEnablementDetail} />
    </Layout>
  );
}
