interface UserInfo {
  id: string;

  firstName: string;

  lastName: string;

  imageUrl: string | undefined;

  email: string;

  phone: string;

  role: string;

  addresses: Address[];
}

interface Address {
  id: string;

  fullAddress: string;

  district: string;

  city: string;
}
