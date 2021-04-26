import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Disease from '../models/Disease';
import { firstLetterUpper } from '../utils/functions';
class DiseaseController {
  async saveMany(request: Request, response: Response) {
    const diseases: Disease[] = request.body;
    const repository = getRepository(Disease);
    const diseasesInserted = await Promise.all(
      diseases.map(async (disease) => {
        const insertDisease = repository.create({ name: disease.name });
        await repository.save(insertDisease);
        return insertDisease;
      })
    );
    return response.json(diseasesInserted);
  }

  async list(request: Request, response: Response) {
    const repository = getRepository(Disease);
    try {
      const diseases = await repository.find({ order: { name: 'ASC' } });
      return response.json(diseases);
    } catch {
      return response
        .status(500)
        .json({ error: 'Ops! Ocorreu um erro ao tentar listar as doenças' });
    }
  }

  async save(request: Request, response: Response) {
    const { name } = request.body;
    const repository = getRepository(Disease);
    const schema = Yup.string().required(
      'Por favor, informe o nome da doença!'
    );
    try {
      await schema.validate(name, { abortEarly: false });
      const diseaseAlreadyExists = await repository.findOne({
        name: firstLetterUpper(name),
      });
      if (diseaseAlreadyExists) {
        return response
          .status(409)
          .json({ error: 'Ops! Essa doença ja consta em nossos registros' });
      }
      const disease = repository.create({ name: firstLetterUpper(name) });
      await repository.save(disease);
      return response.status(201).json(disease);
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path as string] = error.message;
        });

        return response.status(500).json(validationErrors);
      }
    }
  }
}

export default DiseaseController;
