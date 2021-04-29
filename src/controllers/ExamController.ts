import { Request, Response } from 'express';
import path from 'path';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Exam from '../models/Exam';

class ExamController {
  async list(request: Request, response: Response) {
    const { id } = request.query;
    const repository = getRepository(Exam);
    const schema = Yup.object().shape({
      id: Yup.string()
        .uuid('Id informado iválido')
        .required('Informe o id do usuario'),
    });

    try {
      await schema.validate({ id }, { abortEarly: false });

      const exams = await repository.find({ where: { userId: id } });

      return response.json(exams);
    } catch (err) {
      return handleErrors(err, response, 'Erro ao tentar listar os exames');
    }
  }
  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const userId = request.userId;

    const repository = getRepository(Exam);

    const schema = Yup.object().shape({
      id: Yup.string().uuid('Id informado inválido').required('Informe o id'),
    });

    try {
      await schema.validate({ id }, { abortEarly: false });

      const exam = await repository.findOne({ id });

      if (exam?.userId !== userId) {
        return response
          .status(401)
          .json({ warning: 'Você não tem acesso a esse exame' });
      }

      return response.json(exam);
    } catch (error) {
      handleErrors(
        error,
        response,
        'Erro ao tentar pegar as informações do exame'
      );
    }
  }
  async save(request: Request, response: Response) {
    const { name, userId } = request.body;
    const repository = getRepository(Exam);
    const requestFile = request.file as Express.Multer.File;

    const data = {
      name,
      userId,
      path: requestFile.filename,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe um nome para o exame'),

      userId: Yup.string()
        .uuid('Id informado inválido')
        .required('Informe o ID do usuario para salvar o exame'),

      path: Yup.string()
        .required('Informe o arquivo que deseja salvar')
        .max(70, 'Nome muito grande'),
    });

    try {
      await schema.validate(data, { abortEarly: false });

      const exam = repository.create(data);

      await repository.save(exam);

      return response.status(201).json(exam);
    } catch (err) {
      return handleErrors(err, response, 'Erro ao tentar salvar o exame');
    }
  }

  async downloadFile(request: Request, response: Response) {
    const { id } = request.query;
    const userId = request.userId;

    const repository = getRepository(Exam);

    const schema = Yup.object().shape({
      id: Yup.string()
        .uuid('Id informado iválido')
        .required('Informe o id do exam'),
    });

    try {
      await schema.validate({ id }, { abortEarly: false });

      const exam = await repository.findOne({ where: { id } });

      // validates if the request user has authorization for file
      if (exam?.userId !== userId) {
        return response
          .status(401)
          .json({ message: 'você não tem acesso a este arquivo' });
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', exam.path);

      return response.sendFile(filePath);
    } catch (err) {
      return handleErrors(err, response, 'Erro ao tentar baixar o exame');
    }
  }
}

export default ExamController;
