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

		try {
			const user = await repository.findOne({
				where: { email: username },
			});

			if (user) {
				const passwordIsValid = await bcrypt.compare(password, user.password);

				if (!passwordIsValid) {
					return response.status(401).json('Senha inválida');
				}

				const userToken = await userTokenRepository.findOne({
					where: { userId: user.id },
					relations: ['user'],
				});

				return response.json(userView.authentication(userToken as UserToken));
			}
			return response.status(404).json('Usuario não encontrado');
		} catch (error) {
			return response.status(500).json('Erro ao tentar autenticar o usuário');
		}
	}

	async save(request: Request, response: Response) {
		const { name, email, cpf, password, birth } = request.body;

		const secretKey = process.env.SECRET_KEY;

		const userTokenRepository = getRepository(UserToken);

		const repository = getRepository(User);
		try {
			const emailAlreadyExists = await repository.findOne({ where: { email } });

			const cpfAlreadyExists = await repository.findOne({ where: { cpf } });

			if (emailAlreadyExists) {
				return response.status(409).json('E-mail já possui cadastro');
			}

			if (cpfAlreadyExists) {
				return response.status(409).json('CPF já possui cadastro');
			}
			const newUser = repository.create({ name, email, cpf, password, birth });

			await repository.save(newUser);

			const token = jwt.sign({ id: newUser.id }, secretKey || 'secret');

			const userToken = userTokenRepository.create({
				id: token,
				userId: newUser.id,
			});

			await userTokenRepository.save(userToken);

			return response.status(201).json(userView.newUser(newUser, userToken.id));
		} catch {
			return response.status(500).json('Erro ao tentar salvar o usuário');
		}
	}
}

export default UserController;
