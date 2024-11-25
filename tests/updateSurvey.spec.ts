import { UpdateSurveyUseCase } from "@/application/use-cases/updateSurvey";
import { UpdateSurveyDTO } from "@/application/dtos/updateSurvey.dto";
import pool from "@/infrastructure/database/postgres";

jest.mock("@/infrastructure/database/postgres");

describe("UpdateSurveyUseCase", () => {
  let updateSurveyUseCase: UpdateSurveyUseCase;

  beforeEach(() => {
    updateSurveyUseCase = new UpdateSurveyUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if id and title are missing", async () => {
    const data: UpdateSurveyDTO = { id: "", title: "", questions: [] };
    await expect(updateSurveyUseCase.execute(data)).rejects.toThrow(
      "Invalid input. ID, title are required."
    );
  });

  it("should throw an error if survey not found", async () => {
    const data: UpdateSurveyDTO = {
      id: "non-existent-id",
      title: "Updated Survey",
      questions: ["Updated Question 1"],
    };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await expect(updateSurveyUseCase.execute(data)).rejects.toThrow(
      "Survey not found."
    );
  });

  it("should throw an error if mandatory questions are missing", async () => {
    const data: UpdateSurveyDTO = {
      id: "1",
      title: "Updated Survey",
      questions: ["Question 1"],
    };
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: "1", title: "Old Survey", questions: [] }],
    });

    await expect(updateSurveyUseCase.execute(data)).rejects.toThrow(
      "Missing mandatory questions: Público-alvo, Quantidade de estrelas, E-mail para contato"
    );
  });

  it("should update a survey in the database", async () => {
    const data: UpdateSurveyDTO = {
      id: "1",
      title: "Updated Survey",
      questions: [
        "Público-alvo",
        "Quantidade de estrelas",
        "E-mail para contato",
        "Updated Question 1",
        "Updated Question 2",
      ],
    };
    const expectedQuery = {
      text: "UPDATE surveys SET title = $1, questions = $2, updated_at = $3 WHERE id = $4",
      values: [
        "Updated Survey",
        [
          "Público-alvo",
          "Quantidade de estrelas",
          "E-mail para contato",
          "Updated Question 1",
          "Updated Question 2",
        ],
        expect.any(Date),
        "1",
      ],
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: "1", title: "Old Survey", questions: [] }],
    });

    await updateSurveyUseCase.execute(data);

    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
