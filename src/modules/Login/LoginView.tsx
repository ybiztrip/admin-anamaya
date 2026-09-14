import { Button, Form, Image, Input, Layout, Typography } from 'antd';
import { Link, Navigate } from 'react-router-dom';

import AnamayaLogo from '@/assets/anamaya.webp';
import Background from '@/assets/background.jpg';
import { HOME_PATH } from '@/constants/routePath';
import useAuth from '@/hooks/useAuth';

import useLogin from './hooks/useLogin';

const { Title, Text } = Typography;

function Login() {
  const { isAuthenticated } = useAuth();
  const { isLoading, form, login } = useLogin();

  if (isAuthenticated()) {
    return <Navigate to={HOME_PATH} replace />;
  }

  return (
    <Layout className="min-h-screen">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          className="relative flex min-h-[240px] flex-1 flex-col items-center justify-center overflow-hidden bg-cover bg-center px-8 py-10 md:px-12 md:py-14"
          style={{
            backgroundImage: `linear-gradient(rgba(225,230,238,0.75), rgba(225,230,238,0.75)), url(${Background})`,
          }}
        >
          <div className="relative z-10 max-w-md text-center">
            <Link to={HOME_PATH} className="mb-8 inline-block">
              <Image src={AnamayaLogo} width={180} preview={false} />
            </Link>
          </div>
        </aside>

        <main className="flex flex-1 items-center justify-center bg-[#f5f6f8] px-6 py-12 md:px-12">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <Title level={3} className="!mb-1 !mt-0">
                Login to Admin
              </Title>
              <Text type="secondary">Use your admin credentials to continue.</Text>
            </div>

            <Form layout="vertical" form={form} onFinish={login} requiredMark={false}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, whitespace: true }]}
              >
                <Input placeholder="Username" size="large" autoComplete="username" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, whitespace: true }]}
              >
                <Input.Password
                  placeholder="Password"
                  size="large"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item className="!mb-0 !mt-2">
                <Button type="primary" size="large" htmlType="submit" loading={isLoading} block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Login;
