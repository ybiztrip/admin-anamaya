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

export type HotelPropertyDetailPayloadType = {
  propertyIds: string[];
};

export type HotelPropertyDetailType = {
  status: 'available' | 'unavailable';
  propertyId: string;
  propertySummary: {
    name: string;
    formerName: string;
    address: {
      lines: string[];
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
    phoneNumber: string;
    localAddress: {
      lines: string[];
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
    starRating: string;
    reviewScore: number | null;
    accommodationType: string;
    geoLocation: {
      lat: string;
      lon: string;
    };
    countryISO: string;
    geoId: string;
  };
  propertyDetail: any;
  propertyImages: {
    entries: {
      imageType: 'SMALL' | 'MEDIUM' | 'LARGE';
      url: string;
    }[];
    main: false;
    isMain: false;
  }[];
  propertyAmenities: {
    id: string | null;
    category: string;
    name: string;
  }[];
  checkInInfo: {
    instructions: string;
    special_instructions: string;
    begin_time: string;
    min_age: number;
  };
  checkOutInfo: {
    time: string;
  };
  feesInfo: {
    optional: string;
    mandatory: string;
  };
  policiesInfo: {
    instructions: string;
    know_before_you_go: string;
  };
};

export type HotelPropertyDetailResponseType = {
  propertyDatas: HotelPropertyDetailType[];
};

export type HotelProviderType = {
  id: number;
  propertyId: number;
  providerPropertyId: string;
  providerAliasName: string;
  provider: string;
  status: string | null;
  createdOn: number | null;
  updatedOn: number;
};

export type HotelProviderUpdateIdsPayloadType = {
  providerPropertyId: number[];
};

export type HotelOpenSearchPayloadType = {
  propertyIds: string[];
};

export type HotelOpenSearchType = {
  id: string;
  name: string;
  star: number;
  estimationPrice: number;
  address: string[];
  province: string;
  city: string;
  countryCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  rank: number;
  accommodationType: string;
};
