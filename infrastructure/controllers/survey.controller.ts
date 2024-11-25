import { Request, Response } from "express";
import { CreateSurveyUseCase } from "@/application/use-cases/createSurvey";
import { UpdateSurveyUseCase } from "@/application/use-cases/updateSurvey";

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

  async update(req: Request, res: Response) {
    const updateSurveyUseCase = new UpdateSurveyUseCase();
    try {
      await updateSurveyUseCase.execute(req.body);
      res.status(200).json({ message: "Survey updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }
}
