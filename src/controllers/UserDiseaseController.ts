import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'Yup';

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
      return response
        .status(500)
        .json({ error: 'Erro ao tentar listar as doênças do usuario' });
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
      console.log(err);
      const validationErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          const errorPath = error.path ? error.path : 'error';
          validationErrors[errorPath] = error.message;
        });

        return response.status(500).json(validationErrors);
      }
    }
  }
}

export default UserDiseaseController;
