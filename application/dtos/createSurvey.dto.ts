import { object, string, array } from "yup";

export interface CreateSurveyDTO {
  title: string;
  targetAudience: string;
  questions: string[];
}

export const createSurveySchema = object().shape({
  title: string().required().min(1),
  targetAudience: string().required().min(1),
  questions: array().of(string()).min(1),
});
