import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Medicine from '../models/Medicine';
class MedicineController {
	async save(request: Request, response: Response) {
		const medicines: Medicine[] = request.body;
		const repository = getRepository(Medicine);
		const medicinesInserted = await Promise.all(
			medicines.map(async (medicine) => {
				const insertMedicine = repository.create({ name: medicine.name });
				await repository.save(insertMedicine);
				return insertMedicine;
			})
		);
		return response.json(medicinesInserted);
	}

	async list(request: Request, response: Response) {
		const repository = getRepository(Medicine);
		try {
			const medicines = await repository.find({ order: { name: 'ASC' } });
			return response.json(medicines);
		} catch {
			return response
				.status(500)
				.json({ error: 'Ocorreu um erro ao tentar listar as doenças' });
		}
	}

	async listByName(request: Request, response: Response) {
		const { name } = request.params;
		const repository = getRepository(Medicine);
		const schema = Yup.string().required('Informe o nome do medicamento');
		try {
			await schema.validate(name, { abortEarly: false });
			const medicines = await repository.find({
				where: { name: Like(`%${name}%`) },
				order: { name: 'ASC' },
			});
			return response.json(medicines);
		} catch (error) {
			handleErrors(error, response, 'Erro ao listar os medicamentos');
		}
	}
}

export default MedicineController;
