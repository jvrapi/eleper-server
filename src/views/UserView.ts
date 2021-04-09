import User from '../models/User';
import UserToken from '../models/UserToken';

class UserView {
	authentication(userToken: UserToken) {
		return {
			user: {
				id: userToken.userId,
				name: userToken.user.name,
				email: userToken.user.email,
			},
			token: userToken.id,
		};
	}

	newUser(user: User, token: string) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			cpf: user.cpf,
			birth: user.birth,
			token: token,
		};
	}
}

export default UserView;
