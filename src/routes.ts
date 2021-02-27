import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";

const router = Router();

const userController = new UserController();
const surveyContoller = new SurveysController();

router.post("/users", userController.create);
router.post("/survey", surveyContoller.create);
router.get("/survey", surveyContoller.list);

export { router };
