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

  async save(request: Request, response: Response) {
    const diseases: UserDisease[] = request.body;
    const userId = request.userId;

    const repository = getRepository(UserDisease);

    const schema = Yup.array()
      .min(1, "Informe uma lista com os ID's das doenças")
      .of(
        Yup.object().shape({
          diseaseId: Yup.string()
            .uuid('Id informado inválido')
            .required('Informe o id da doença'),
          diagnosisDate: Yup.date(),
          active: Yup.boolean().required(
            'Informe se a doença está em tratamento ou não'
          ),
        })
      );

    try {
      await schema.validate(diseases, { abortEarly: false });
      const userDiseases = await Promise.all(
        diseases.map(async (disease) => {
          const userDiseaseData = { ...disease, userId };
          const saveDisease = repository.create(userDiseaseData);
          await repository.save(saveDisease);
          return saveDisease;
        })
      );
      return response.status(201).json(userDiseases);
    } catch (err) {
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
