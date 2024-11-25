import {
  AnswerSurveyDTO,
  answerSurveySchema,
} from "@/application/dtos/answerSurvey.dto";
import { getSurveyById, mandatoryQuestions } from "./utils/utils";
import pool from "@/infrastructure/database/postgres";
import { Survey } from "@/infrastructure/database/models/surveys";

export class AnswerSurveyUseCase {
  async execute(data: AnswerSurveyDTO): Promise<void> {
    if (!data?.surveyId || !data?.responses) {
      throw new Error("Invalid input. Survey ID and responses are required.");
    }
    await answerSurveySchema.validate(data);

    const { rows }: { rows: Survey[] } = await pool.query(
      getSurveyById(data.surveyId)
    );

    const questions = data.responses.filter(
      (response) => !mandatoryQuestions.includes(response.question)
    ) || [{}];
    const requiredQuestions = questions.map((q) => q.question);
    const dbRequiredQuestions = rows[0].questions.filter(
      (response) => !mandatoryQuestions.includes(response)
    );

    dbRequiredQuestions.find((q) => {
      if (!requiredQuestions.includes(q)) {
        throw new Error("Not all fields were filled");
      }
    });

    const query = {
      text: `INSERT INTO survey_responses (survey_id, response, stars, email, target_audience) VALUES ($1, $2, $3, $4, $5)`,
      values: [
        data.surveyId,
        JSON.stringify(questions),
        data.responses.find(
          (response) => response.question === "Quantidade de estrelas"
        )?.response,
        data.responses.find(
          (response) => response.question === "E-mail para contato"
        )?.response,
        data.responses.find((response) => response.question === "Público-alvo")
          ?.response,
      ],
    };

    await pool.query(query);
  }
}
