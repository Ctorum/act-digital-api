import {
  UpdateSurveyDTO,
  updateSurveySchema,
} from "@/application/dtos/updateSurvey.dto";
import { Survey } from "@/infrastructure/database/models/surveys";
import { mandatoryQuestions } from "./utils/utils";
import pool from "@/infrastructure/database/postgres";

export class UpdateSurveyUseCase {
  async execute(data: UpdateSurveyDTO): Promise<void> {
    if (!data?.id && !data?.title) {
      throw new Error("Invalid input. ID, title are required.");
    }
    await updateSurveySchema.validate(data);
    pool.connect();

    const existingSurveyQuery = {
      text: "SELECT * FROM surveys WHERE id = $1",
      values: [data.id],
    };
    const { rows }: { rows: Survey[] } = await pool.query(existingSurveyQuery);

    if (rows.length === 0) {
      throw new Error("Survey not found.");
    }

    const missingQuestions = mandatoryQuestions.filter(
      (question) => !data.questions.includes(question)
    );
    if (missingQuestions.length > 0) {
      throw new Error(
        `Missing mandatory questions: ${missingQuestions.join(", ")}`
      );
    }

    const query = {
      text: "UPDATE surveys SET title = $1, questions = $2, updated_at = $3 WHERE id = $4",
      values: [data.title, data.questions, new Date(), data.id],
    };
    await pool.query(query);
  }
}
