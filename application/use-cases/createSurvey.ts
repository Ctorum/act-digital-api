import {
  CreateSurveyDTO,
  createSurveySchema,
} from "@/application/dtos/createSurvey.dto";
import { mandatoryQuestions } from "./utils/utils";
import pool from "@/infrastructure/database/postgres";

export class CreateSurveyUseCase {
  async execute(data: CreateSurveyDTO): Promise<void> {
    if (!data?.title) {
      throw new Error("Invalid input. Title is required.");
    }
    await createSurveySchema.validate(data);
    pool.connect();
    const query = {
      text: "INSERT INTO surveys (title, questions) VALUES ($1, $2)",
      values: [data.title, [...mandatoryQuestions, ...data.questions]],
    };
    await pool.query(query);
  }
}
