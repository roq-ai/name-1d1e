import * as yup from 'yup';

export const performanceEvaluationValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  team_lead_id: yup.string().nullable(),
});
