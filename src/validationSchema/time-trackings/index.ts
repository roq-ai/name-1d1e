import * as yup from 'yup';

export const timeTrackingValidationSchema = yup.object().shape({
  hours: yup.number().integer().required(),
  team_lead_id: yup.string().nullable(),
});
