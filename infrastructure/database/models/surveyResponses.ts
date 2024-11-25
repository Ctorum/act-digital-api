export interface SurveyResponse {
  id: number;
  survey_id: number;
  response: { question: string; response: string }[];
  stars?: number;
  email: string;
  target_audience: string;
  created_at?: Date;
}
