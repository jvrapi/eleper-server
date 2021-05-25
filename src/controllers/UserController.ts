import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import path from 'path';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import User from '../models/User';
import UserToken from '../models/UserToken';
import UserView from '../views/UserView';

const userView = new UserView();

class UserController {
	async authentication(request: Request, response: Response) {
		const { username, password } = request.body;

		const repository = getRepository(User);
		const userTokenRepository = getRepository(UserToken);

		const data = { username, password };

		const schema = Yup.object().shape({
			username: Yup.string()
				.email('Informe um usuario valido')
				.required('Informe o usuario para realizar a autenticação'),
			password: Yup.string().required('Informe a senha do usuario'),
		});

		try {
			await schema.validate(data, { abortEarly: false });
			const user = await repository.findOne({
				where: { email: username },
			});

			if (user) {
				const passwordIsValid = await bcrypt.compare(password, user.password);

				if (!passwordIsValid) {
					return response.status(401).json({ error: 'Senha inválida' });
				}

				const userToken = await userTokenRepository.findOne({
					where: { userId: user.id },
					relations: ['user'],
				});

				return response.json(userView.authentication(userToken as UserToken));
			}
			return response.status(404).json({ error: 'Usuario não encontrado' });
		} catch (err) {
			return handleErrors(err, response, 'Erro ao tentar autenticar o usuário');
		}
	}

	async save(request: Request, response: Response) {
		const { name, email, cpf, password, birth } = request.body;

		const secretKey = process.env.SECRET_KEY;

		const userTokenRepository = getRepository(UserToken);

		const repository = getRepository(User);

		const data = { name, email, cpf, password, birth };

		const schema = Yup.object().shape({
			name: Yup.string().required('Informe o nome do usuário'),

			cpf: Yup.string().required('Informe o cpf do usuário'),

			birth: Yup.string()
				.test('date-validation', 'Data não é valida', (date) => {
					const dateIsValid = moment(
						moment(date).toDate(),
						'YYYY-MM-DDThh:mm:ssZ'
					).isValid();

					return dateIsValid;
				})
				.required('Informe a data de nascimento'),

			email: Yup.string()
				.email('Informe um e-mail válido')
				.required('Informe o e-mail do usuário'),

			password: Yup.string()
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a senha do usuário'),
		});

		try {
			await schema.validate(data, {
				abortEarly: false, // o padrão é true
			});

			const emailAlreadyExists = await repository.findOne({ where: { email } });

			const cpfAlreadyExists = await repository.findOne({ where: { cpf } });

			if (emailAlreadyExists) {
				return response
					.status(409)
					.json({ error: 'E-mail já possui cadastro' });
			}

			if (cpfAlreadyExists) {
				return response.status(409).json({ error: 'CPF já possui cadastro' });
			}
			const newUser = repository.create({
				name,
				email,
				cpf: cpf.replace(/\D/g, ''),
				password,
				birth,
			});

			await repository.save(newUser);

			const token = jwt.sign({ id: newUser.id }, secretKey || 'secret');

			const userToken = userTokenRepository.create({
				id: token,
				userId: newUser.id,
			});

			await userTokenRepository.save(userToken);

			return response.status(201).json(userView.newUser(newUser, userToken.id));
		} catch (err) {
			return handleErrors(err, response, 'Erro ao tentar salvar o usuário');
		}
	}

	async redefinePassword(request: Request, response: Response) {
		const { email, password, code } = request.body;

		const repository = getRepository(User);

		const data = { email, password, code };

		const schema = Yup.object().shape({
			email: Yup.string()
				.email('Informe um email valido')

				.required('Informe o email para redefinir a senha'),
			password: Yup.string()
				.min(6, 'A senha deve ter no mínimo 6 caracteres')
				.required('Informe a nova senha '),
			code: Yup.string()
				.min(11, 'Código Inválido')
				.max(11, 'Código Inválido')
				.required('Informe o código para redefinir a senha'),
		});

		try {
			await schema.validate(data, { abortEarly: false });
			const user = await repository.findOne({ email });

			if (user?.code !== code) {
				return response.status(500).json({ error: 'Código inválido' });
			}

			const updateUser = repository.create({
				...user,
				code: null,
				password,
			});

			await repository.save(updateUser);

			return response.json(userView.details(updateUser));
		} catch (err) {
			return handleErrors(
				err,
				response,
				'Erro ao tentar redefinir a senha do usuário'
			);
		}
	}

	async record(request: Request, response: Response) {
		const { userId } = request.params;
		const requestUserId = request.userId;

		const repository = getRepository(User);

		const schema = Yup.string()
			.uuid('Id informado inválido')
			.required('Informe o id');

		try {
			await schema.validate(userId, { abortEarly: false });
			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'Você não possui acesso a essas informações' });
			}
			const record = await repository.findOne({
				where: { id: userId },
				relations: [
					'exams',
					'hospitalizations',
					'userSurgeries',
					'userDiseases',
					'userDiseases.disease',
				],
			});
			return response.json(record);
		} catch (error) {
			handleErrors(error, response, 'Erro ao listar as informações do usuário');
		}
	}

	async getById(request: Request, response: Response) {
		const { userId } = request.params;

		const requestUserId = request.userId;

		const repository = getRepository(User);

		const schema = Yup.string()
			.uuid('Id informado inválido')
			.required('Informe o id');

		try {
			await schema.validate(userId, { abortEarly: false });

			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ warning: 'Você não tem acesso a esse exame' });
			}
			const user = await repository.findOne({ id: userId });

			return response.json(userView.userDetails(user as User));
		} catch (error) {
			handleErrors(
				error,
				response,
				'Erro ao tentar pegar as informações do exame'
			);
		}
	}

	async update(request: Request, response: Response) {
		const { id, name, email, cpf, birth, password } = request.body;

		const requestUserId = request.userId;

		const repository = getRepository(User);

		const schema = Yup.object().shape({
			id: Yup.string().uuid('Id informado inválido').required('Informe o id'),

			name: Yup.string().required('Informe o nome do usuário'),

			cpf: Yup.string().required('Informe o cpf do usuário'),

			birth: Yup.string()
				.test('date-validation', 'Data não é valida', (date) => {
					const dateIsValid = moment(
						moment(date).toDate(),
						'YYYY-MM-DDThh:mm:ssZ'
					).isValid();

					return dateIsValid;
				})
				.required('Informe a data de nascimento'),

			email: Yup.string()
				.email('Informe um e-mail válido')
				.required('Informe o e-mail do usuário'),

			password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
		});

		const data = {
			id,
			name,
			email,
			cpf,
			birth,
			password,
		};

		try {
			await schema.validate(data, { abortEarly: false });

			if (requestUserId !== id) {
				return response
					.status(401)
					.json({ warning: 'Você não tem acesso a esse exame' });
			}

			data.birth = moment(data.birth).toDate();

			const dbInfo = await repository.findOne({ id });

			if (!password) {
				data.password = dbInfo?.password;
			}

			const userDetails = repository.create(data);
			await repository.save(userDetails);
			return response.json(userView.userDetails(userDetails));
		} catch (error) {
			handleErrors(
				error,
				response,
				'Erro ao atualizar as informações do usuario'
			);
		}
	}

	async delete(request: Request, response: Response) {
		const { userId } = request.params;
		const requestUserId = request.userId;

		const repository = getRepository(User);

		const schema = Yup.string()
			.uuid('Id informado inválido')
			.required('Informe o id ');

		try {
			await schema.validate(userId, { abortEarly: false });

			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'você não pode realizar essa ação' });
			}
			await repository.delete(userId);
			const userDir = path.join(__dirname, '..', '..', 'uploads', userId);
			fs.rmSync(userDir, { recursive: true });
			return response.sendStatus(200);
		} catch (error) {
			handleErrors(error, response, 'Erro ao excluir a conta do usuario');
		}
	}
}
export default UserController;
