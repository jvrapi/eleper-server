import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import UserDisease from '../models/UserDisease';
import UserDiseaseView from '../views/UserDiseaseView';

const userDiseaseView = new UserDiseaseView();

class UserDiseaseController {
  async list(request: Request, response: Response) {
    const { userId } = request.params;
    const repository = getRepository(UserDisease);
    try {
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
}

export default UserDiseaseController;
