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

	details(userSurgery: UserSurgery) {
		return {
			id: userSurgery.id,
			userId: userSurgery.userId,
			afterEffects: userSurgery.afterEffects,
			surgery: {
				id: userSurgery.surgery.id,
				name: userSurgery.surgery.name,
			},
			hospitalization: {
				id: userSurgery.hospitalization.id,
				location: userSurgery.hospitalization.location,
				reason: userSurgery.hospitalization.reason,
				entranceDate: userSurgery.hospitalization.entranceDate,
				exitDate: userSurgery.hospitalization.exitDate,
			},
		};
	}
}

export default UserSurgeryView;
