import User from '../models/User';
import UserToken from '../models/UserToken';

class UserView {
	authentication(userToken: UserToken) {
		return {
			user: {
				id: userToken.userId,
				name: userToken.user.name,
			},
			token: userToken.id,
		};
	}

	newUser(user: User, token: string) {
		return {
			user: {
				id: user.id,
				name: user.name,
			},
			token: token,
		};
	}

	details(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}

	userDetails(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			cpf: user.cpf,
			birth: user.birth,
		};
	}
}

export default UserView;
