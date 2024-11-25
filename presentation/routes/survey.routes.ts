import { Router } from "express";
import { SurveyController } from "@/infrastructure/controllers/survey.controller";
import { SurveyResponseController } from "@/infrastructure/controllers/surveyResponse.controller";

const router = Router();
const surveyController = new SurveyController();
const surveyResponseController = new SurveyResponseController();

router.post("/", (req, res) => surveyController.create(req, res));
router.put("/", (req, res) => surveyController.update(req, res));
router.get("/", (req, res) => surveyResponseController.list(req, res));
router.get("/download", (req, res) =>
  surveyResponseController.download(req, res)
);
router.post("/answer", (req, res) => surveyResponseController.answer(req, res));

export default router;
