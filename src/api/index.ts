import { USERS_DETAIL_API } from '@/constants/api';
import type { ResponseType, UserType } from '@/types';
import axios from '@/utils/api';

export async function fetchUserDetail(id: string): Promise<ResponseType<UserType>> {
  const res = await axios.get(USERS_DETAIL_API.replace(':id', id));
  return res.data;
}
