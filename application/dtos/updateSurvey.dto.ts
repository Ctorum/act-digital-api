import { object, string, array } from "yup";

export interface UpdateSurveyDTO {
  id: string;
  title: string;
  questions: string[];
}

export const updateSurveySchema = object().shape({
  id: string().required().min(1),
  title: string().required().min(1),
  questions: array().of(string()).min(1),
});
