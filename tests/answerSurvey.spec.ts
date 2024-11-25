import { AnswerSurveyUseCase } from "@/application/use-cases/answerSurvey";
import { AnswerSurveyDTO } from "@/application/dtos/answerSurvey.dto";
import pool from "@/infrastructure/database/postgres";

jest.mock("@/infrastructure/database/postgres");

describe("AnswerSurveyUseCase", () => {
  let answerSurveyUseCase: AnswerSurveyUseCase;

  beforeEach(() => {
    answerSurveyUseCase = new AnswerSurveyUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if surveyId or responses are missing", async () => {
    const data: AnswerSurveyDTO = { surveyId: 0, responses: [] };
    await expect(answerSurveyUseCase.execute(data)).rejects.toThrow(
      "Invalid input. A valid Survey ID and responses are required."
    );
  });
});
