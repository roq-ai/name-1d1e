import { TeamLeadInterface } from 'interfaces/team-lead';
import { GetQueryInterface } from 'interfaces';

export interface TimeTrackingInterface {
  id?: string;
  team_lead_id?: string;
  hours: number;
  created_at?: any;
  updated_at?: any;

  team_lead?: TeamLeadInterface;
  _count?: {};
}

export interface TimeTrackingGetQueryInterface extends GetQueryInterface {
  id?: string;
  team_lead_id?: string;
}
