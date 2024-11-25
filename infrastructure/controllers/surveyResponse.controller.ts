import { Request, Response } from "express";
import { AnswerSurveyUseCase } from "@/application/use-cases/answerSurvey";
import { ListSurveyUseCase } from "@/application/use-cases/listSurvey";
import { DownloadSurveyUseCase } from "@/application/use-cases/downloadSurvey";

export class SurveyResponseController {
  async answer(req: Request, res: Response) {
    const answerSurveyUseCase = new AnswerSurveyUseCase();
    try {
      await answerSurveyUseCase.execute(req.body);
      res.status(201).json({ message: "Survey answered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  async list(req: Request, res: Response) {
    const listSurveyUseCase = new ListSurveyUseCase();
    try {
      const surveys = await listSurveyUseCase.execute(
        req.query.targetAudience as string,
        req.query.orderByStars as "asc" | "desc" | undefined
      );
      res.status(200).json(surveys);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  async download(req: Request, res: Response) {
    const downloadSurveyUseCase = new DownloadSurveyUseCase();
    try {
      const csv = await downloadSurveyUseCase.execute(
        req.query.targetAudience as string,
        req.query.orderByStars as "asc" | "desc" | undefined
      );
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=survey.csv");
      res.send(csv);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }
}
