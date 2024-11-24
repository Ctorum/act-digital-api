import {
  CreateSurveyDTO,
  createSurveySchema,
} from "@/application/dtos/createSurvey.dto";
import client from "@/infrastructure/database/postgres";

export class CreateSurveyUseCase {
  async execute(data: CreateSurveyDTO): Promise<void> {
    console.log(data);
    if (!data?.title || !data?.targetAudience) {
      throw new Error("Invalid input. Title and target audience are required.");
    }
    const mandatoryQuestions = [
      "Público-alvo",
      "Quantidade de estrelas",
      "E-mail para contato",
    ];
    await createSurveySchema.validate(data);
    client.connect();
    const query = {
      text: "INSERT INTO surveys (title, target_audience, questions) VALUES ($1, $2, $3)",
      values: [
        data.title,
        data.targetAudience,
        [...mandatoryQuestions, ...data.questions],
      ],
    };
    await client.query(query);
  }
}
