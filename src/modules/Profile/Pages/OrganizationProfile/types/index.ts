export interface IEditOrganizationProfie {
  name: string;
  email: string;
  profile_image: string | File | null;
  address: string;
  city: string;
  country: string;
  pin: string;
  organizationType: string;
}
