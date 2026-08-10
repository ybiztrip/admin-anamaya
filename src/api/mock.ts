import type { HotelOpenSearchType, HotelProviderType, ResponseType } from '@/types';

export const mockFetchHotelProvider: ResponseType<HotelProviderType[]> = {
  success: true,
  message: 'Success',
  data: [
    {
      id: 428433,
      propertyId: 9409190,
      providerPropertyId: '100567384',
      providerAliasName: 'Hotel Daisy',
      provider: 'EXPEDIA',
      status: null,
      createdOn: null,
      updatedOn: 1764569045000,
    },
    {
      id: 822062,
      propertyId: 9409190,
      providerPropertyId: '91425335',
      providerAliasName: 'Sinchon Localfriends Hotel',
      provider: 'EXPEDIA',
      status: null,
      createdOn: null,
      updatedOn: 1764863710000,
    },
    {
      id: 1015803,
      propertyId: 9409190,
      providerPropertyId: '36288970',
      providerAliasName: 'Hotel Daisy',
      provider: 'EXPEDIA',
      status: null,
      createdOn: null,
      updatedOn: 1764982727000,
    },
  ],
};

export const mockFetchHotelOpenSearch: ResponseType<HotelOpenSearchType> = {
  success: true,
  message: 'Success',
  data: {
    id: '9409190',
    name: 'Hotel Daisy',
    star: 3,
    estimationPrice: 300000,
    address: ['Via Dott. F. Garofoli, 294'],
    province: 'VR',
    city: 'San Giovanni Lupatoto',
    countryCode: 'IT',
    postalCode: '37057',
    latitude: 45.396868,
    longitude: 11.025483,
    rank: 286700,
    accommodationType: 'INN',
  },
};
