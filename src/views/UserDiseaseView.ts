import UserDisease from '../models/UserDisease';

class UserDiseaseView {
	listDiseases(userDiseases: UserDisease[]) {
		return userDiseases.map((userDisease) => {
			return {
				id: userDisease.id,
				user: {
					id: userDisease.user.id,
					name: userDisease.user.name,
				},
				disease: {
					id: userDisease.disease.id,
					name: userDisease.disease.name,
				},
				diagnosisDate: userDisease.diagnosisDate,
				active: userDisease.active,
			};
		});
	}

	details(userDisease: UserDisease) {
		return {
			id: userDisease.id,
			active: userDisease.active,
			diagnosisDate: userDisease.diagnosisDate,
			disease: userDisease.disease,
		};
	}
}

export default UserDiseaseView;
