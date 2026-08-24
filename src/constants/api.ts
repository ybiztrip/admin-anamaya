export const BASE_API = import.meta.env.VITE_ANAMAYA_BASE_API;

export const API_V1 = '/api/v1';

export const AUTH_API = API_V1 + '/auth';
export const AUTH_LOGIN_API = AUTH_API + '/login';

export const USERS_API = API_V1 + '/users';
export const USERS_DETAIL_API = USERS_API + '/:id';

export const DOCUMENT_API = API_V1 + '/documents';
export const DOCUMENT_UPLOAD_API = DOCUMENT_API + '/upload';
export const DOCUMENT_URL_API = DOCUMENT_API + '/url';

export const HOTEL_API = API_V1 + '/hotel';
export const HOTEL_SEARCH_API = HOTEL_API + '/search';
export const HOTEL_GEO_LIST_API = HOTEL_API + '/geo/list';
export const HOTEL_PROPERTY_DETAIL_API = HOTEL_API + '/property-detail';
export const HOTEL_ADMIN_API = HOTEL_API + '/admin';
export const HOTEL_ADMIN_PROPERTY_MAPPING_API = HOTEL_ADMIN_API + '/property-mapping/:id';
export const HOTEL_ADMIN_OPEN_SEARCH_API = HOTEL_ADMIN_API + '/opensearch/:id';
export const HOTEL_ADMIN_PRICE_CONFIG_API = HOTEL_ADMIN_API + '/price-config';

export const FLIGHT_API = API_V1 + '/flight';
export const FLIGHT_ADMIN_API = FLIGHT_API + '/admin';
export const FLIGHT_ADMIN_PRICE_CONFIG_API = FLIGHT_ADMIN_API + '/price-config';

export const ACCOUNT_API = API_V1 + '/admin/general/account';

export const PROVIDER_API = API_V1 + '/admin/provider';
export const PROVIDER_FETCH_API = PROVIDER_API + '/fetch';
export const PROVIDER_SAVE_API = PROVIDER_API + '/save';
