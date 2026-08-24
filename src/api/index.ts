import type { AxiosRequestConfig } from 'axios';

import {
  ACCOUNT_API,
  DOCUMENT_UPLOAD_API,
  DOCUMENT_URL_API,
  FLIGHT_ADMIN_PRICE_CONFIG_API,
  HOTEL_ADMIN_OPEN_SEARCH_API,
  HOTEL_ADMIN_PRICE_CONFIG_API,
  HOTEL_ADMIN_PROPERTY_MAPPING_API,
  HOTEL_GEO_LIST_API,
  HOTEL_PROPERTY_DETAIL_API,
  HOTEL_SEARCH_API,
  PROVIDER_FETCH_API,
  PROVIDER_SAVE_API,
  USERS_DETAIL_API,
} from '@/constants/api';
import type {
  AccountType,
  HotelGeoListPayloadType,
  HotelGeoListType,
  HotelOpenSearchType,
  HotelPropertyDetailPayloadType,
  HotelPropertyDetailResponseType,
  HotelProviderType,
  HotelProviderUpdatePayloadType,
  HotelSearchPayloadType,
  HotelType,
  PaginationResponseType,
  PriceFetchParamsType,
  PriceType,
  ProviderFetchPayloadType,
  ProviderType,
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

export async function fetchHotelProvider(id: string): Promise<ResponseType<HotelProviderType[]>> {
  const res = await axios.get(HOTEL_ADMIN_PROPERTY_MAPPING_API.replace(':id', id));
  return res.data;
}

export async function updateHotelProvider(
  id: string,
  params: HotelProviderUpdatePayloadType,
): Promise<ResponseType<any>> {
  const res = await axios.post(HOTEL_ADMIN_PROPERTY_MAPPING_API.replace(':id', id), params);
  return res.data;
}

export async function fetchHotelOpenSearch(id: string): Promise<ResponseType<HotelOpenSearchType>> {
  const res = await axios.get(HOTEL_ADMIN_OPEN_SEARCH_API.replace(':id', id));
  return res.data;
}

export async function updateHotelOpenSearch(
  id: string,
  params: HotelOpenSearchType,
): Promise<ResponseType<any>> {
  const res = await axios.put(HOTEL_ADMIN_OPEN_SEARCH_API.replace(':id', id), params);
  return res.data;
}

export async function fetchHotelPriceConfig(
  params: PriceFetchParamsType,
): Promise<ResponseType<PriceType>> {
  const res = await axios.get(HOTEL_ADMIN_PRICE_CONFIG_API, { params });
  return res.data;
}

export async function updateHotelPriceConfig(params: PriceType): Promise<ResponseType<any>> {
  const res = await axios.post(HOTEL_ADMIN_PRICE_CONFIG_API, params);
  return res.data;
}

export async function fetchFlightPriceConfig(
  params: PriceFetchParamsType,
): Promise<ResponseType<PriceType>> {
  const res = await axios.get(FLIGHT_ADMIN_PRICE_CONFIG_API, { params });
  return res.data;
}

export async function updateFlightPriceConfig(params: PriceType): Promise<ResponseType<any>> {
  const res = await axios.post(FLIGHT_ADMIN_PRICE_CONFIG_API, params);
  return res.data;
}

export async function documentUpload(
  params: FormData,
  config: AxiosRequestConfig<FormData>,
): Promise<ResponseType<any>> {
  const res = await axios.post(DOCUMENT_UPLOAD_API, params, config);
  return res.data;
}

export async function documentUrl(key: string): Promise<ResponseType<string>> {
  const res = await axios.get(DOCUMENT_URL_API, { params: { key } });
  return res.data;
}

export async function fetchAccounts(): Promise<ResponseType<AccountType[]>> {
  const res = await axios.get(ACCOUNT_API);
  return res.data;
}

export async function fetchProviders(
  params: ProviderFetchPayloadType,
): Promise<ResponseType<ProviderType[]>> {
  const res = await axios.post(PROVIDER_FETCH_API, params);
  return res.data;
}

export async function saveProviders(params: ProviderType): Promise<ResponseType<any>> {
  const res = await axios.post(PROVIDER_SAVE_API, params);
  return res.data;
}
