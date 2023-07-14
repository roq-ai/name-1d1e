import { TeamLeadInterface } from 'interfaces/team-lead';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceEvaluationInterface {
  id?: string;
  team_lead_id?: string;
  rating: number;
  created_at?: any;
  updated_at?: any;

  team_lead?: TeamLeadInterface;
  _count?: {};
}

export interface PerformanceEvaluationGetQueryInterface extends GetQueryInterface {
  id?: string;
  team_lead_id?: string;
}
