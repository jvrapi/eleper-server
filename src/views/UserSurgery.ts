import UserSurgery from '../models/UserSurgery';

class UserSurgeryView {
	list(userSurgeries: UserSurgery[]) {
		return userSurgeries.map((userSurgery) => ({
			id: userSurgery.id,
			surgery: {
				id: userSurgery.surgery.id,
				name: userSurgery.surgery.name,
			},
			hospitalization: {
				id: userSurgery.hospitalization.id,
				location: userSurgery.hospitalization.location,
				entranceDate: userSurgery.hospitalization.entranceDate,
				exitDate: userSurgery.hospitalization.exitDate,
			},
		}));
	}
}

export default UserSurgeryView;
