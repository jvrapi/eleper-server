import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import User from '../models/User';

interface TokenPayload {
	id: string;
	iat: number;
	exp: number;
}

export default async function AuthenticationMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authorization = request.headers.authorization
		? request.headers.authorization
		: request.query.authorization;

	if (!authorization) {
		return response.sendStatus(401);
	}

	let token = authorization as string;
	token = token.replace('Bearer', '').trim();
	const userRepository = getRepository(User);

	try {
		const secret = process.env.SECRET_KEY || 'secret';

		const data = jwt.verify(token, secret);
		const { id } = data as TokenPayload;

		const userExists = await userRepository.findOne({
			where: { id },
			relations: ['userToken'],
		});

		if (!userExists) {
			return response.sendStatus(401);
		}
		if (userExists.userToken.id !== token) {
			return response.sendStatus(401);
		}
		request.userId = id;

		return next();
	} catch {
		return response.sendStatus(401);
	}
}
