import { HomeOutlined } from '@ant-design/icons';
import type { ComponentType } from 'react';

import { HOTEL_PATH } from '@/constants/routePath';

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
    name: 'hotel',
    title: 'Hotel',
    path: HOTEL_PATH,
    childs: [],
    Icon: HomeOutlined,
  },
];
