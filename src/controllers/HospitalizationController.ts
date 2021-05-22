import { Request, Response } from 'express';
import moment from 'moment';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Disease from '../models/Disease';
import Hospitalization from '../models/Hospitalization';

class HospitalizationController {
  async list(request: Request, response: Response) {
    const { userId } = request.params;

    const requestUserId = request.userId;

    const repository = getRepository(Hospitalization);

    const schema = Yup.string().uuid('Id inválido').required('Informe o id');

    try {
      await schema.validate(userId, { abortEarly: false });

      if (userId !== requestUserId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essas informações' });
      }

      const hospitalizations = await repository.find({
        where: { userId: userId },
        relations: ['diseases'],
      });

      return response.json(hospitalizations);
    } catch (error) {
      handleErrors(
        error,
        response,
        'Erro ao tentar listar as internações do usuário'
      );
    }
  }
  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const requestUserId = request.userId;

    const repository = getRepository(Hospitalization);

    const schema = Yup.string()
      .uuid('Id informado inválido')
      .required('Informe o id ');

    try {
      await schema.validate(id, { abortEarly: false });

      const hospitalization = await repository.findOne({
        where: { id },
        relations: ['diseases'],
      });

      if (!hospitalization) {
        return response.sendStatus(200);
      }

      if (requestUserId !== hospitalization?.userId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essas informações' });
      }

      return response.json(hospitalization);
    } catch (error) {
      handleErrors(error, response, 'Erro ao listar as informações');
    }
  }

  async save(request: Request, response: Response) {
    const {
      userId,
      surgeryId,
      entranceDate,
      exitDate,
      location,
      reason,
      diseases,
    } = request.body;

    const requestUserId = request.userId;

    const repository = getRepository(Hospitalization);

    const data = {
      userId,
      surgeryId,
      entranceDate: moment(entranceDate).toDate(),
      exitDate: exitDate ? moment(exitDate).toDate() : null,
      location,
      reason,
      diseases,
    };

    const schema = Yup.object().shape({
      userId: Yup.string()
        .uuid('Id informado inválido')
        .required('Informe o id '),

      surgeryId: Yup.string().uuid('Id informado inválido'),

      entranceDate: Yup.string()
        .test('date-validation', 'Data não é valida', (date) => {
          const dateIsValid = moment(
            new Date(date as string),
            'YYYY-MM-DDThh:mm:ssZ',
            true
          ).isValid();
          return dateIsValid;
        })
        .required('Informe a data de entrada'),

      exitDate: Yup.string()
        .nullable()
        .test('date-validation', 'Data não é valida', (date) => {
          if (date) {
            const dateIsValid = moment(
              new Date(date as string),
              'YYYY-MM-DDThh:mm:ssZ',
              true
            ).isValid();
            return dateIsValid;
          }
          return true;
        }),

      location: Yup.string().required('Informe aonde aconteceu a internação'),
      reason: Yup.string().required('Informe o motivo da internação'),
      diseases: Yup.array().of(Yup.string().uuid('Id informado inválido')),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      if (userId !== requestUserId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essas informações' });
      }

      const diseaseRepository = getRepository(Disease);

      const findDiseases = await diseaseRepository.findByIds(diseases);

      data.diseases = findDiseases;

      const hospitalization = repository.create(data);

      await repository.save(hospitalization);

      return response.status(201).json(hospitalization);
    } catch (error) {
      handleErrors(error, response, 'Erro ao tentar salvar as informações');
    }
  }

  async update(request: Request, response: Response) {
    const {
      id,
      userId,
      surgeryId,
      entranceDate,
      exitDate,
      location,
      reason,
      diseases,
    } = request.body;

    const requestUserId = request.userId;

    const repository = getRepository(Hospitalization);

    const data = {
      id,
      userId,
      surgeryId,
      entranceDate: moment(entranceDate).toDate(),
      exitDate: exitDate ? moment(exitDate).toDate() : null,
      location,
      reason,
      diseases,
    };

    const schema = Yup.object().shape({
      id: Yup.string().uuid('Id informado inválido').required('Informe o id'),

      userId: Yup.string()
        .uuid('Id informado inválido')
        .required('Informe o id do usuário'),

      surgeryId: Yup.string().uuid('Id informado inválido'),

      entranceDate: Yup.string()
        .test('date-validation', 'Data não é valida', (date) => {
          const dateIsValid = moment(
            new Date(date as string),
            'YYYY-MM-DDThh:mm:ssZ',
            true
          ).isValid();
          return dateIsValid;
        })
        .required('Informe a data de entrada'),

      exitDate: Yup.string()
        .nullable()
        .test('date-validation', 'Data não é valida', (date) => {
          if (date) {
            const dateIsValid = moment(
              new Date(date as string),
              'YYYY-MM-DDThh:mm:ssZ',
              true
            ).isValid();
            return dateIsValid;
          }
          return true;
        }),

      location: Yup.string().required('Informe aonde aconteceu a internação'),
      reason: Yup.string().required('Informe o motivo da internação'),
      diseases: Yup.array().of(Yup.string().uuid('Id informado inválido')),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      if (userId !== requestUserId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essas informações' });
      }

      const diseaseRepository = getRepository(Disease);

      const findDiseases = await diseaseRepository.findByIds(diseases);

      data.diseases = findDiseases;

      const hospitalization = repository.create(data);

      await repository.save(hospitalization);

      return response.status(201).json(hospitalization);
    } catch (error) {
      handleErrors(error, response, 'Erro ao tentar salvar as informações');
    }
  }

  async deleteMany(request: Request, response: Response) {
    const hospitalizationIds: string[] = request.body;

    const requestUserId = request.userId;

    const repository = getRepository(Hospitalization);

    const schema = Yup.array()
      .min(1, "Informe uma lista com os ID's das doenças")
      .of(Yup.string().uuid('Id informado inválido').required('Informe o id '));

    try {
      await schema.validate(hospitalizationIds, { abortEarly: false });
      const res = await Promise.all(
        hospitalizationIds.map(async (id) => {
          const hospitalizationInfo = await repository.findOne({
            where: { id: id },
          });

          const res: Record<string, string> = {};

          const date = moment(hospitalizationInfo?.entranceDate).format(
            'DD/MM/YYYY'
          );

          if (hospitalizationInfo?.userId !== requestUserId) {
            res[date] = 'Você não pode excluir esse item';
          } else {
            await repository.delete(id);
            res[date] = 'Internação excluída com sucesso';
          }

          return res;
        })
      );
      return response.json(res);
    } catch (error) {
      return handleErrors(
        error,
        response,
        'Erro ao excluir as internações do usuário'
      );
    }
  }
}

export default HospitalizationController;
