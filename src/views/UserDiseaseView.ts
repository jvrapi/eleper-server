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
}

export default UserDiseaseView;
