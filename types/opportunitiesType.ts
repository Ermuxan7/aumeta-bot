export interface OpportunityPayload {
  country_id: number;
  region_id?: number | null;
  content: string;
  contact: string;
  img?: string | null;
}
