export type UserRoleType = {
  id: number;
  roleId: number;
  roleName: string;
  roleCode: string;
};

export type UserType = {
  id: number;
  companyId: number;
  email: string;
  travelPolicyId: number;
  firstName: string;
  lastName: string;
  gender: string;
  positionId: number;
  countryCode: string;
  phoneNo: string;
  title: string;
  identityNo: string;
  passportNo: string;
  passportExpiry: string;
  dateOfBirth: string;
  nationality: string;
  status: number;
  createdBy?: number;
  createdAt?: string;
  updatedBy?: number;
  updatedAt?: string;
  password?: string;
  enableChatEngine?: boolean;
  roles?: UserRoleType[];
};
