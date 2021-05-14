import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Exam from '../models/Exam';
import ExamView from '../views/ExamView';

const examView = new ExamView();

class ExamController {
  async list(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Exam);
    const schema = Yup.object().shape({
      id: Yup.string()
        .uuid('Id informado iválido')
        .required('Informe o id do usuario'),
    });

    try {
      await schema.validate({ id }, { abortEarly: false });

      const exams = await repository.find({
        where: { userId: id },
        order: {
          createdAt: 'ASC',
          name: 'ASC',
        },
      });

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

      return response.json(examView.examDetails(exam));
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

    const { filename } = request.file as Express.Multer.File;

    const data = {
      name,
      userId,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe um nome para o exame'),

      userId: Yup.string()
        .uuid('Id informado inválido')
        .required('Informe o ID do usuario para salvar o exame'),
    });

    const fileTimestamp = filename.split(/(\d{13})/g);

    const originalFilePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      userId,
      'files',
      filename
    );

    const finalFileName = `${fileTimestamp[1]}-${name.trim()}.pdf`;

    const newFilePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      userId,
      'files',
      finalFileName
    );

    fs.renameSync(originalFilePath, newFilePath);

    try {
      await schema.validate(data, { abortEarly: false });

      const exam = repository.create({ ...data, path: finalFileName });

      await repository.save(exam);

      return response.status(201).json(exam);
    } catch (err) {
      console.log(err);
      return handleErrors(err, response, 'Erro ao tentar salvar o exame');
    }
  }

  async update(request: Request, response: Response) {
    const { name, id } = request.body;

    const requestFile = request.file as Express.Multer.File;

    const repository = getRepository(Exam);

    const data = { name, id };

    const userId = request.userId;

    const userFilesPath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      userId,
      'files'
    );

    let finalFileName;
    let originalFilePath;
    let newFilePath;

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe um nome para o exame'),

      id: Yup.string()
        .uuid('Id informado inválido')
        .required('Informe o ID do exame'),
    });

    try {
      await schema.validate(data, { abortEarly: false });

      const databaseInfos = await repository.findOne({ id });

      if (!databaseInfos) {
        return response.status(200).json({ message: 'Exame não encontrado' });
      }

      if (databaseInfos.userId !== userId) {
        return response
          .status(401)
          .json({ message: 'Você não pode atualizar esse exame' });
      }

      if (requestFile) {
        const fileTimestamp = requestFile.filename.split(/(\d{13})/g);

        finalFileName = `${fileTimestamp[1]}-${name.trim()}.pdf`;

        originalFilePath = path.join(userFilesPath, requestFile.filename);

        newFilePath = path.join(userFilesPath, finalFileName);

        fs.renameSync(originalFilePath, newFilePath);
        fs.unlinkSync(path.join(userFilesPath, databaseInfos.path));
      } else {
        finalFileName = `${Date.now()}-${name.trim()}.pdf`;

        originalFilePath = path.join(userFilesPath, databaseInfos.path);

        newFilePath = path.join(userFilesPath, finalFileName);

        fs.renameSync(originalFilePath, newFilePath);
      }

      const updateExam = {
        ...databaseInfos,
        name,
        path: finalFileName || databaseInfos.path,
      };

      const exam = repository.create(updateExam);

      await repository.save(exam);

      return response.json(examView.examDetails(exam));
    } catch (err) {
      return handleErrors(err, response, 'Erro ao tentar salvar o exame');
    }
  }

  async examFile(request: Request, response: Response) {
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

      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        userId,
        'files',
        exam?.path as string
      );
      return response.download(filePath, exam.name + '.pdf');
    } catch (err) {
      return handleErrors(err, response, 'Erro ao tentar baixar o exame');
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userId = request.userId;
    const repository = getRepository(Exam);
    try {
      const exam = await repository.findOne({ id });
      if (!exam) {
        return response.json({ message: 'Exame não encontrado' });
      }
      if (exam.userId !== userId) {
        return response
          .status(401)
          .json({ message: 'Você não tem permissão para excluir esse exame' });
      }
      await repository.delete(id);
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        userId,
        'files',
        exam.path
      );
      fs.unlinkSync(filePath);
      return response.json({ message: 'Exame excluído com sucesso' });
    } catch (error) {
      return handleErrors(error, response, 'Erro ao tentar excluir o exame');
    }
  }
}

export default ExamController;
