import { Connection, createConnection } from 'typeorm';

import Disease from '../models/Disease';
import Medicine from '../models/Medicine';
import Surgery from '../models/Surgery';
import diseases from '../utils/diseases';
import medicines from '../utils/medicines';
import surgeries from '../utils/surgeries';

interface JsonData {
	name: string;
}

async function connectToDatabase() {
	const connection = await createConnection();
	await verifyDiseases(connection);
	await verifySurgeries(connection);
	await verifyMedicines(connection);
}

async function verifyDiseases(connection: Connection) {
	const repository = await connection.getRepository(Disease);
	diseases.forEach(async (disease: JsonData) => {
		const diseaseAlreadyExists = await repository.findOne({
			name: disease.name,
		});
		if (!diseaseAlreadyExists) {
			const newDisease = repository.create({ name: disease.name });
			await repository.save(newDisease);
		}
	});
}

async function verifySurgeries(connection: Connection) {
	const repository = await connection.getRepository(Surgery);
	surgeries.forEach(async (surgery) => {
		const surgeryAlreadyExists = await repository.findOne({
			name: surgery.name,
		});
		if (!surgeryAlreadyExists) {
			const newSurgery = repository.create({ name: surgery.name });
			await repository.save(newSurgery);
		}
	});
}

async function verifyMedicines(connection: Connection) {
	const repository = await connection.getRepository(Medicine);
	medicines.forEach(async (medicine: JsonData) => {
		const medicineAlreadyExists = await repository.findOne({
			name: medicine.name,
		});
		if (!medicineAlreadyExists) {
			const newMedicine = repository.create({ name: medicine.name });
			await repository.save(newMedicine);
		}
	});
}

connectToDatabase();
