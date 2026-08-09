import { Navigate } from 'react-router-dom';

import { HOTEL_PATH } from '@/constants/routePath';

function Home() {
  return (
    <Navigate to={HOTEL_PATH} replace />
  );
}
export default Home;
