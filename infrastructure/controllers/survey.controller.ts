import { Request, Response } from "express";
import { CreateSurveyUseCase } from "@/application/use-cases/createSurvey.useCase";

export class SurveyController {
  async create(req: Request, res: Response) {
    const createSurveyUseCase = new CreateSurveyUseCase();
    try {
      await createSurveyUseCase.execute(req.body);
      res.status(201).json({ message: "Survey created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }
}
