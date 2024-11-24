import { Router } from "express";
import { SurveyController } from "@/infrastructure/controllers/survey.controller";

const router = Router();
const surveyController = new SurveyController();

router.post("/create", (req, res) => surveyController.create(req, res));

export default router;
