import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  // http://localhost:3333/answers/1?u=43500fcc-3b35-463a-be12-126bb46d22d5
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUserRepository = getCustomRepository(SurveyUsersRepository);
    const surveyUser = await surveyUserRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists");
    }

    if (surveyUser.value) {
      return res.status(200).json({ message: "Survey already answered" });
    }

    surveyUser.value = Number(value);
    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
