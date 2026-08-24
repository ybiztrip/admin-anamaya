export type ProviderType = {
  accountId: string;
  provider: string;
  category: string;
  status: string;
};

export type ProviderFetchPayloadType = {
  accountId: string;
  category: string;
};
