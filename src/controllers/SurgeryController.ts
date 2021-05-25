import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
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

	async listByName(request: Request, response: Response) {
		const { name } = request.params;
		const repository = getRepository(Surgery);
		const schema = Yup.string().required('Informe o nome do medicamento');
		try {
			await schema.validate(name, { abortEarly: false });
			const surgeries = await repository.find({
				where: { name: Like(`%${name}%`) },
				order: { name: 'ASC' },
			});
			return response.json(surgeries);
		} catch (error) {
			handleErrors(error, response, 'Erro ao listar as cirurgias');
		}
	}
}

export default SurgeryController;
