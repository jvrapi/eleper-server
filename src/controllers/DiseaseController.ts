import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Disease from '../models/Disease';
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
}

export default DiseaseController;
