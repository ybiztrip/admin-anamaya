import type { HotelProviderType, ResponseType } from '@/types';

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
