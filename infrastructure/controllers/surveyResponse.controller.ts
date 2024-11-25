import { Request, Response } from "express";
import { AnswerSurveyUseCase } from "@/application/use-cases/answerSurvey";

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
}
