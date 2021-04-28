import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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
      birth: Yup.string().required('Informe a data de nascimento do usuário'),
      email: Yup.string()
        .email('Informe um e-mail válido')
        .required('Informe o e-mail do usuario'),
      password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Informe a senha do usuario'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
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
}
export default UserController;
