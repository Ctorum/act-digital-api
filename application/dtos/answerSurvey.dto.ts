import { object, string, array } from "yup";

export interface AnswerSurveyDTO {
  surveyId: number;
  responses: Array<{ question: string; response: string }>;
}

export const answerSurveySchema = object().shape({
  surveyId: string().required(),
  responses: array()
    .of(
      object().shape({
        question: string().required(),
        response: string().required(),
      })
    )
    .min(1),
});
