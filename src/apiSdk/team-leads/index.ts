import axios from 'axios';
import queryString from 'query-string';
import { TeamLeadInterface, TeamLeadGetQueryInterface } from 'interfaces/team-lead';
import { GetQueryInterface } from '../../interfaces';

export const getTeamLeads = async (query?: TeamLeadGetQueryInterface) => {
  const response = await axios.get(`/api/team-leads${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeamLead = async (teamLead: TeamLeadInterface) => {
  const response = await axios.post('/api/team-leads', teamLead);
  return response.data;
};

export const updateTeamLeadById = async (id: string, teamLead: TeamLeadInterface) => {
  const response = await axios.put(`/api/team-leads/${id}`, teamLead);
  return response.data;
};

export const getTeamLeadById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/team-leads/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamLeadById = async (id: string) => {
  const response = await axios.delete(`/api/team-leads/${id}`);
  return response.data;
};
