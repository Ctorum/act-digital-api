import { ListSurveyUseCase } from "@/application/use-cases/listSurvey";
import pool from "@/infrastructure/database/postgres";

jest.mock("@/infrastructure/database/postgres");

describe("ListSurveyUseCase", () => {
  let listSurveyUseCase: ListSurveyUseCase;

  beforeEach(() => {
    listSurveyUseCase = new ListSurveyUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if target audience is missing", async () => {
    await expect(listSurveyUseCase.execute("")).rejects.toThrow(
      "Invalid input. Target audience is required."
    );
  });

  it("should retrieve survey responses from the database ordered by stars", async () => {
    const targetAudience = "Clientes";
    const expectedQuery = {
      text: `
        SELECT * FROM survey_responses
        WHERE target_audience = $1
        ORDER BY stars ASC
      `,
      values: [targetAudience],
    };

    await listSurveyUseCase.execute(targetAudience);

    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
