import UserToken from '../models/UserToken';

class UserView {
	authentication(userToken: UserToken) {
		return {
			user: userToken.userId,
			token: userToken.id,
		};
	}
}

export default UserView;
