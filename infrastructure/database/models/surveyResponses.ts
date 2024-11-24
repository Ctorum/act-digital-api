export interface SurveyResponse {
  id: number;
  survey_id: number;
  response: object;
  stars?: number;
  email: string;
  created_at?: Date;
}
