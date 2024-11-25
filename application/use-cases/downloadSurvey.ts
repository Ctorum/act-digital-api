import pool from "@/infrastructure/database/postgres";
import { stringify } from "csv";

export class DownloadSurveyUseCase {
  async execute(
    targetAudience: string,
    orderByStars: "asc" | "desc" = "asc"
  ): Promise<string> {
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
    const surveys = result?.rows || [];

    return new Promise((resolve, reject) => {
      stringify(
        surveys,
        {
          header: true,
          delimiter: ",",
          columns: {
            id: "ID",
            target_audience: "Target Audience",
            stars: "Stars",
            response: "Response",
            created_at: "Created At",
            email: "Email",
          },
        },
        (err, output) => {
          if (err) {
            console.error("Error generating CSV:", err);
            reject(err);
          } else {
            resolve(output);
          }
        }
      );
    });
  }
}
