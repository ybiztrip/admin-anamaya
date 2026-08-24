import { Route, Routes } from 'react-router-dom';

import {
  HOME_PATH,
  HOTEL_DETAIL_PATH,
  HOTEL_PATH,
  LOGIN_PATH,
  PRICE_CONFIG_DETAIL_PATH,
  PRICE_CONFIG_PATH,
  PROVIDER_ENABLEMENT_DETAIL_PATH,
  PROVIDER_ENABLEMENT_PATH,
} from '@/constants/routePath';
import HomeView from '@/modules/Home/HomeView';
import HotelDetailView from '@/modules/Hotel/HotelDetailView';
import HotelView from '@/modules/Hotel/HotelView';
import LoginView from '@/modules/Login/LoginView';
import PriceDetailView from '@/modules/Price/PriceDetailView';
import PriceView from '@/modules/Price/PriceView';
import ProviderDetailView from '@/modules/Provider/ProviderDetailView';
import ProviderView from '@/modules/Provider/ProviderView';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<LoginView />} />
      <Route
        path={HOME_PATH}
        element={
          <ProtectedRoute>
            <HomeView />
          </ProtectedRoute>
        }
      />
      <Route
        path={HOTEL_PATH}
        element={
          <ProtectedRoute>
            <HotelView />
          </ProtectedRoute>
        }
      />
      <Route
        path={HOTEL_DETAIL_PATH}
        element={
          <ProtectedRoute>
            <HotelDetailView />
          </ProtectedRoute>
        }
      />
      <Route
        path={PROVIDER_ENABLEMENT_PATH}
        element={
          <ProtectedRoute>
            <ProviderView />
          </ProtectedRoute>
        }
      />
      <Route
        path={PROVIDER_ENABLEMENT_DETAIL_PATH}
        element={
          <ProtectedRoute>
            <ProviderDetailView />
          </ProtectedRoute>
        }
      />
      <Route
        path={PRICE_CONFIG_PATH}
        element={
          <ProtectedRoute>
            <PriceView />
          </ProtectedRoute>
        }
      />
      <Route
        path={PRICE_CONFIG_DETAIL_PATH}
        element={
          <ProtectedRoute>
            <PriceDetailView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
