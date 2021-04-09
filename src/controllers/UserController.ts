import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import User from '../models/User';
import UserToken from '../models/UserToken';
import UserView from '../views/UserView';

const userView = new UserView();

class UserController {
	async authentication(request: Request, response: Response) {
		const { username, password } = request.body;

		const repository = getRepository(User);

		const userTokenRepository = getRepository(UserToken);

		const secretKey = process.env.SECRET_KEY;
		try {
			const user = await repository.findOne({ where: { email: username } });

			if (user) {
				const passwordIsValid = bcrypt.compare(password, user.password);

				if (!passwordIsValid) {
					return response.status(401).send('Senha inválida');
				}

				const token = jwt.sign({ id: user.id }, secretKey || 'secret');
				const userToken = userTokenRepository.create({
					id: token,
					userId: user.id,
				});
				await userTokenRepository.save(userToken);
				return response.json(userView.authentication(userToken));
			}
			return response.send('Usuario não encontrado');
		} catch {
			return response.status(500).send('Erro ao tentar autenticar o usuário');
		}
	}
}

export default UserController;
