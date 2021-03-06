import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";

const router = Router();

const userController = new UserController();
const surveyContoller = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();

router.post("/users", userController.create);

router.post("/survey", surveyContoller.create);
router.get("/survey", surveyContoller.list);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

export { router };
