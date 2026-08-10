export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const HOTEL_PATH = '/hotel';
export const HOTEL_DETAIL_PATH = '/hotel/:id';

export const getHotelDetailPath = (id: string) => `${HOTEL_PATH}/${id}`;
