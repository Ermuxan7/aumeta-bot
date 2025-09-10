export interface ProjectType {
  country_id: number;
  region_id: number;
  who_needed: string;
  task_description: string;
  deadline: string | undefined;
  salary: string;
  contact: string;
  address: string | undefined;
  additional_info: string | undefined;
}
