import { DollarOutlined, HomeOutlined, PoweroffOutlined } from '@ant-design/icons';
import type { ComponentType } from 'react';

import { HOTEL_PATH, PRICE_CONFIG_PATH, PROVIDER_ENABLEMENT_PATH } from '@/constants/routePath';

export type MenuChild = {
  name: string;
  title: string;
  path: string;
  permissions?: string[];
  Icon?: ComponentType;
};

export type Menu = {
  name: string;
  title: string;
  path: string;
  childs: MenuChild[];
  permissions?: string[];
  Icon?: ComponentType;
};

export const menus: Menu[] = [
  {
    name: 'hotelConfig',
    title: 'Hotel Config',
    path: HOTEL_PATH,
    childs: [],
    Icon: HomeOutlined,
  },
  {
    name: 'providerEnablement',
    title: 'Provider Enablement',
    path: PROVIDER_ENABLEMENT_PATH,
    childs: [],
    Icon: PoweroffOutlined,
  },
  {
    name: 'priceConfig',
    title: 'Price Config',
    path: PRICE_CONFIG_PATH,
    childs: [],
    Icon: DollarOutlined,
  },
];
