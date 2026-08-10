import {
  HOTEL_GEO_LIST_API,
  HOTEL_PROPERTY_DETAIL_API,
  HOTEL_SEARCH_API,
  USERS_DETAIL_API,
} from '@/constants/api';
import type {
  HotelGeoListPayloadType,
  HotelGeoListType,
  HotelPropertyDetailPayloadType,
  HotelPropertyDetailResponseType,
  HotelSearchPayloadType,
  HotelType,
  PaginationResponseType,
  ResponseType,
  UserType,
} from '@/types';
import axios from '@/utils/api';

export async function fetchUserDetail(id: string): Promise<ResponseType<UserType>> {
  const res = await axios.get(USERS_DETAIL_API.replace(':id', id));
  return res.data;
}

export async function fetchHotels(
  params: HotelSearchPayloadType,
): Promise<PaginationResponseType<HotelType>> {
  const res = await axios.post(HOTEL_SEARCH_API, params);
  return res.data;
}

export async function fetchHotelGeoList(
  params: HotelGeoListPayloadType,
): Promise<ResponseType<HotelGeoListType>> {
  const res = await axios.post(HOTEL_GEO_LIST_API, params);
  return res.data;
}

export async function fetchHotelPropertyDetail(
  params: HotelPropertyDetailPayloadType,
): Promise<ResponseType<HotelPropertyDetailResponseType>> {
  const res = await axios.post(HOTEL_PROPERTY_DETAIL_API, params);
  return res.data;
}
