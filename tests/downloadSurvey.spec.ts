import { DownloadSurveyUseCase } from "@/application/use-cases/downloadSurvey";
import pool from "@/infrastructure/database/postgres";

jest.mock("@/infrastructure/database/postgres");

describe("DownloadSurveyUseCase", () => {
  let downloadSurveyUseCase: DownloadSurveyUseCase;

  beforeEach(() => {
    downloadSurveyUseCase = new DownloadSurveyUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if target audience is missing", async () => {
    await expect(downloadSurveyUseCase.execute("")).rejects.toThrow(
      "Invalid input. Target audience is required."
    );
  });

  it("should retrieve a survey from the database", async () => {
    const targetAudience = "Clientes";
    const expectedQuery = {
      text: `
        SELECT * FROM survey_responses
        WHERE target_audience = $1
        ORDER BY stars ASC
      `,
      values: [targetAudience],
    };

    await downloadSurveyUseCase.execute(targetAudience);

    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
