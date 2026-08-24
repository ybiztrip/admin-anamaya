export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const HOTEL_PATH = '/hotel';
export const HOTEL_DETAIL_PATH = '/hotel/:id';
export const PROVIDER_ENABLEMENT_PATH = '/provider-enablement';
export const PROVIDER_ENABLEMENT_DETAIL_PATH = '/provider-enablement/:id';
export const PRICE_CONFIG_PATH = '/price-config';
export const PRICE_CONFIG_DETAIL_PATH = '/price-config/:id';

export const getHotelDetailPath = (id: string) => `${HOTEL_PATH}/${id}`;
export const getProviderEnablementDetailPath = (id: string) => `${PROVIDER_ENABLEMENT_PATH}/${id}`;
export const getPriceConfigDetailPath = (id: string) => `${PRICE_CONFIG_PATH}/${id}`;
