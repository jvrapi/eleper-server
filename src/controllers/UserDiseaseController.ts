import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Disease from '../models/Disease';
import UserDisease from '../models/UserDisease';
import UserDiseaseView from '../views/UserDiseaseView';

const userDiseaseView = new UserDiseaseView();

class UserDiseaseController {
  async list(request: Request, response: Response) {
    const { userId } = request.params;
    const userIdToken = request.userId;
    const repository = getRepository(UserDisease);
    try {
      if (userIdToken !== userId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essa infomrações' });
      }
      const diseases = await repository.find({
        where: { userId },
        relations: ['disease', 'user'],
      });
      return response.json(userDiseaseView.listDiseases(diseases));
    } catch (error) {
      return handleErrors(
        error,
        response,
        'Erro ao listar as doenças do usuário'
      );
    }
  }

  async saveMany(request: Request, response: Response) {
    const diseases: UserDisease[] = request.body;

    const repository = getRepository(UserDisease);

    const schema = Yup.array()
      .min(1, "Informe uma lista com os ID's das doenças")
      .of(
        Yup.object().shape({
          diseaseId: Yup.string()
            .uuid('Id informado inválido')
            .required('Informe o id da doença'),
          userId: Yup.string()
            .uuid('Id informado inválido')
            .required('Informe o id do usuário'),
          diagnosisDate: Yup.date(),
          active: Yup.boolean(),
        })
      );

    try {
      await schema.validate(diseases, { abortEarly: false });
      const userDiseases = await Promise.all(
        diseases.map(async (userDisease) => {
          const saveDisease = repository.create(userDisease);
          await repository.save(saveDisease);
          return saveDisease;
        })
      );
      return response.status(201).json(userDiseases);
    } catch (err) {
      return handleErrors(
        err,
        response,
        'Erro ao salvar as doenças do usuário'
      );
    }
  }

  async unrecordedDiseases(request: Request, response: Response) {
    const { id } = request.params;
    const userId = request.userId;
    const repository = getRepository(UserDisease);
    const diseaseRepository = getRepository(Disease);
    try {
      if (id !== userId) {
        return response
          .status(401)
          .json({ message: 'Você não tem acesso a essa infomrações' });
      }
      const recordedDiseases = await repository
        .createQueryBuilder('ud')
        .select('ud.diseaseId as id')
        .innerJoin('ud.user', 'user')
        .where(`ud.userId = '${id}' `)
        .getQuery();

      const unrecordedDiseases = await diseaseRepository
        .createQueryBuilder('d')
        .select(['d.id as id', 'd.name as name'])
        .where(`d.id NOT IN (${recordedDiseases})`)
        .orderBy('d.name')
        .getRawMany();
      return response.send(unrecordedDiseases);
    } catch (error) {
      return handleErrors(
        error,
        response,
        'Erro ao listar as doenças do usuário'
      );
    }
  }
}

export default UserDiseaseController;
