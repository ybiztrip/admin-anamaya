import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import { getPriceConfigDetailPath } from '@/constants/routePath';
import AccountList from '@/modules/Account/components/AccountList';
import type { AccountType } from '@/types';

const { Title } = Typography;

export default function PriceView() {
  const navigate = useNavigate();

  const openAccountPriceDetail = (account: AccountType) => {
    navigate(getPriceConfigDetailPath(account.id), { state: { account } });
  };
  return (
    <Layout>
      <Title level={4}>Price Config</Title>
      <AccountList onOpenAccountDetail={openAccountPriceDetail} />
    </Layout>
  );
}
