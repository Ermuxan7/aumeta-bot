export interface ProjectType {
  country_id: number | null;
  region_id: number | null;
  who_needed: string;
  task_description: string;
  deadline: string | undefined;
  salary: string;
  contact: string;
  address: string | undefined;
  additional_info: string | undefined;
}
