import UserDisease from '../models/UserDisease';

class UserDiseaseView {
  listDiseases(userDiseases: UserDisease[]) {
    return userDiseases.map((userDisease) => {
      return {
        ...userDisease,
      };
    });
  }
}

export default UserDiseaseView;
