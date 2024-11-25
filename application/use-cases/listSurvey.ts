import pool from "@/infrastructure/database/postgres";

export class ListSurveyUseCase {
  async execute(
    targetAudience: string,
    orderByStars: "asc" | "desc" = "asc"
  ): Promise<any[]> {
    if (!targetAudience) {
      throw new Error("Invalid input. Target audience is required.");
    }

    const order = orderByStars === "asc" ? "ASC" : "DESC";
    const query = {
      text: `
        SELECT * FROM survey_responses
        WHERE target_audience = $1
        ORDER BY stars ${order}
      `,
      values: [targetAudience],
    };

    const result = await pool.query(query);
    return result?.rows || [];
  }
}
