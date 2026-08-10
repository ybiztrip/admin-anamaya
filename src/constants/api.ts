export const BASE_API = import.meta.env.VITE_ANAMAYA_BASE_API;

export const API_V1 = '/api/v1';

export const AUTH_API = API_V1 + '/auth';
export const AUTH_LOGIN_API = AUTH_API + '/login';

export const USERS_API = API_V1 + '/users';
export const USERS_DETAIL_API = USERS_API + '/:id';

export const HOTEL_API = API_V1 + '/hotel';
export const HOTEL_SEARCH_API = HOTEL_API + '/search';
export const HOTEL_GEO_LIST_API = HOTEL_API + '/geo/list';
export const HOTEL_PROPERTY_DETAIL_API = HOTEL_API + '/property-detail';
