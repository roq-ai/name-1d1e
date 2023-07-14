const mapping: Record<string, string> = {
  organizations: 'organization',
  'performance-evaluations': 'performance_evaluation',
  'team-leads': 'team_lead',
  'time-trackings': 'time_tracking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
