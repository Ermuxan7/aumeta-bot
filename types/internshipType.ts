export interface InternshipType {
  country_id: number;
  region_id: number;
  position_title: string;
  organization_name: string | undefined;
  requirements: string;
  duties: string;
  conditions: string | undefined;
  address: string;
  salary: string | undefined;
  contact: string | undefined;
  additional_info: string | undefined;
}
