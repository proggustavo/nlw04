import { request, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email().required("Email é obrigatório"),
    });

    // Outra opção pra validar
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: "Validation failed!" });
    // }

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new AppError("User already exists!");
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export { UserController };
