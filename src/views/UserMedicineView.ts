import UserMedicine from '../models/UserMedicine';

class UserMedicineView {
	list(userMedicines: UserMedicine[]) {
		return userMedicines.map((userMedicine) => ({
			id: userMedicine.id,
			amount: userMedicine.amount,
			instruction: userMedicine.instruction,
			beginDate: userMedicine.beginDate,
			endDate: userMedicine.endDate,
			medicine: {
				id: userMedicine.medicine.id,
				name: userMedicine.medicine.name,
			},
			disease: {
				id: userMedicine.userDisease.disease.id,
				name: userMedicine.userDisease.disease.name,
			},
		}));
	}

	details(userMedicine: UserMedicine) {
		return {
			id: userMedicine.id,
			userDiseaseId: userMedicine.userDiseaseId,
			amount: userMedicine.amount,
			instruction: userMedicine.instruction,
			beginDate: userMedicine.beginDate,
			endDate: userMedicine.endDate,
			medicine: {
				id: userMedicine.medicine.id,
				name: userMedicine.medicine.name,
			},
			disease: {
				id: userMedicine.userDisease.disease.id,
				name: userMedicine.userDisease.disease.name,
			},
		};
	}
}

export default UserMedicineView;
