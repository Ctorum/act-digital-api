import { CreateSurveyUseCase } from "@/application/use-cases/createSurvey";
import { CreateSurveyDTO } from "@/application/dtos/createSurvey.dto";
import pool from "@/infrastructure/database/postgres";

jest.mock("@/infrastructure/database/postgres");

describe("CreateSurveyUseCase", () => {
  let createSurveyUseCase: CreateSurveyUseCase;

  beforeEach(() => {
    createSurveyUseCase = new CreateSurveyUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if title is missing", async () => {
    const data: CreateSurveyDTO = { title: "", questions: [] };
    await expect(createSurveyUseCase.execute(data)).rejects.toThrow(
      "Invalid input. Title is required."
    );
  });

  it("should insert a survey into the database", async () => {
    const data: CreateSurveyDTO = {
      title: "New Survey",
      questions: ["Question 1", "Question 2"],
    };
    const expectedQuery = {
      text: "INSERT INTO surveys (title, questions) VALUES ($1, $2)",
      values: [
        "New Survey",
        [
          "Público-alvo",
          "Quantidade de estrelas",
          "E-mail para contato",
          "Question 1",
          "Question 2",
        ],
      ],
    };

    await createSurveyUseCase.execute(data);

    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
