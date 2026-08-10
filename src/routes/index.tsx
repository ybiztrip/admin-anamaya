import { Route, Routes } from 'react-router-dom';

import { HOME_PATH, HOTEL_DETAIL_PATH, HOTEL_PATH, LOGIN_PATH } from '@/constants/routePath';
import HomeView from '@/modules/Home/HomeView';
import HotelView from '@/modules/Hotel/HotelView';
import LoginView from '@/modules/Login/LoginView';

import HotelDetailView from '../modules/Hotel/HotelDetailView';
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
    </Routes>
  );
}

export default App;
