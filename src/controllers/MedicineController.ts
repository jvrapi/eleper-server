import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

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
}

export default MedicineController;
