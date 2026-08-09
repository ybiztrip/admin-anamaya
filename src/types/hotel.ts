export type HotelFilterType = {
  searchKey: string;
  area: {
    label: string;
    value: string;
  } | null;
  hotelStars: [boolean, boolean, boolean, boolean, boolean];
};

export type HotelSearchPayloadType = {
  area: string;
  count: string;
  key: string;
  page: number;
  stars: [boolean, boolean, boolean, boolean, boolean];
};

export type HotelType = {
  id: string;
  status: string;
  name: string;
  latitude: number;
  longitude: number;
  lineData: string[];
  city: string;
  province: string;
  postalCode: string;
  country: string;
  star: number;
  accommodationType: string;
  propertyImageData: {
    entries: {
      imageType: 'SMALL' | 'MEDIUM' | 'LARGE';
      url: string;
    }[];
    main: boolean;
    isMain: boolean;
  }[];
  facilityData: {
    facilityId: string;
    category: string;
    name: string;
  }[];
};

export type HotelGeoListPayloadType = {
  countryCode: string;
  offset: string;
  key: string;
  limit: string;
};

export type HotelGeoListType = {
  geoId: string;
  parentId: string;
  type: string;
  name: string;
  localeName: string;
  centroId: {
    lon: string;
    lat: string;
    valid: boolean;
  };
};
