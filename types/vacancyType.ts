export type VacancyPayload = {
  country_id: number | undefined;
  region_id: number | undefined;
  position_title: string;
  organization_name: string | undefined;
  address: string;
  requirements: string;
  duties: string | undefined;
  work_schedule: string;
  salary: string;
  contact: string;
  additional_info: string | undefined;
};
