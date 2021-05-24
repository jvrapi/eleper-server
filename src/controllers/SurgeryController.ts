import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Surgery from '../models/Surgery';

class SurgeryController {
	async save(request: Request, response: Response) {
		const surgeries: Surgery[] = request.body;
		const repository = getRepository(Surgery);
		const surgeriesInserted = await Promise.all(
			surgeries.map(async (surgery) => {
				const insertSurgery = repository.create({ name: surgery.name });
				await repository.save(insertSurgery);
				return insertSurgery;
			})
		);
		return response.json(surgeriesInserted);
	}

	async list(request: Request, response: Response) {
		const repository = getRepository(Surgery);
		try {
			const surgeries = await repository.find({ order: { name: 'ASC' } });
			return response.json(surgeries);
		} catch {
			return response
				.status(500)
				.json({ error: 'Ocorreu um erro ao tentar listar as doenças' });
		}
	}
}

export default SurgeryController;
