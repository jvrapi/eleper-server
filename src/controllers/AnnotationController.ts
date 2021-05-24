import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import handleErrors from '../errors';
import Annotation from '../models/Annotation';
import AnnotationView from '../views/AnnotationView';

const annotationView = new AnnotationView();

class AnnotationController {
	async list(request: Request, response: Response) {
		const { userId } = request.params;
		const requestUserId = request.userId;
		const repository = getRepository(Annotation);
		const schema = Yup.string().uuid('Id inválid').required('informe o id');

		try {
			await schema.validate(userId, { abortEarly: false });
			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'Você não possui acesso a essas informações' });
			}
			const annotations = await repository.find({
				where: { userId },
				relations: ['disease'],
			});
			return response.json(annotations);
		} catch (error) {
			handleErrors(error, response, 'Erro ao tentar listar as anotações');
		}
	}
	async getById(request: Request, response: Response) {
		const { id } = request.params;
		const requestUserId = request.userId;
		const repository = getRepository(Annotation);
		const schema = Yup.string()
			.uuid('Id informado inválido')
			.required('Informe o id');
		try {
			await schema.validate(id, { abortEarly: false });

			const annotation = await repository.findOne({
				where: { id },
				relations: ['disease'],
			});
			if (annotation?.userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'Você não possui acesso a essas informações' });
			}

			return response.json(annotationView.details(annotation));
		} catch (error) {
			handleErrors(
				error,
				response,
				'Erro ao tentar listar as informações da anotação'
			);
		}
	}

	async save(request: Request, response: Response) {
		const { userId, description, diseaseId } = request.body;

		const requestUserId = request.userId;

		const repository = getRepository(Annotation);

		const schema = Yup.object().shape({
			userId: Yup.string()
				.uuid('Id informado inválido')
				.required('Informe o id'),
			description: Yup.string().required('Informe a descrição da anotação'),
			diseaseId: Yup.string().uuid('id invalido').nullable(),
		});

		const data = {
			userId,
			description,
			diseaseId,
		};

		try {
			await schema.validate(data, { abortEarly: false });
			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'Você não possui acesso a essa operação' });
			}
			const annotation = repository.create(data);
			await repository.save(annotation);
			return response.status(201).json(annotation);
		} catch (error) {
			handleErrors(error, response, 'Erro ao salvar a anotação');
		}
	}

	async update(request: Request, response: Response) {
		const { id, userId, description, diseaseId } = request.body;

		const requestUserId = request.userId;

		const repository = getRepository(Annotation);

		const schema = Yup.object().shape({
			id: Yup.string().uuid('Id informado inválido').required('Informe o id'),
			userId: Yup.string()
				.uuid('Id informado inválido')
				.required('Informe o id'),
			description: Yup.string().required('Informe a descrição da anotação'),
			diseaseId: Yup.string().uuid('id invalido').nullable(),
		});

		const data = {
			id,
			userId,
			description,
			diseaseId,
		};

		try {
			await schema.validate(data, { abortEarly: false });
			if (userId !== requestUserId) {
				return response
					.status(401)
					.json({ message: 'Você não possui acesso a essa operação' });
			}
			const annotation = repository.create(data);
			await repository.save(annotation);
			const annotationResponse = await repository.findOne({
				where: { id: annotation.id },
				relations: ['disease'],
			});
			return response.json(
				annotationView.details(annotationResponse as Annotation)
			);
		} catch (error) {
			handleErrors(error, response, 'Erro ao salvar a anotação');
		}
	}

	async deleteMany(request: Request, response: Response) {
		const annotations: string[] = request.body;

		const requestUserId = request.userId;

		const repository = getRepository(Annotation);

		const schema = Yup.array()
			.min(1, "Informe uma lista com os ID's das doenças")
			.of(Yup.string().uuid('Id informado inválido').required('Informe o id '));

		try {
			await schema.validate(annotations, { abortEarly: false });

			const res = await Promise.all(
				annotations.map(async (annotationId) => {
					const annotationInfo = await repository.findOne({
						where: { id: annotationId },
					});

					const res: Record<string, string> = {};

					if (annotationInfo?.userId !== requestUserId) {
						res[cutString(annotationInfo?.description as string)] =
							'Você não pode excluir esse item';
					} else {
						await repository.delete(annotationId);
						res[cutString(annotationInfo?.description as string)] =
							'Anotação excluída com sucesso';
					}

					return res;
				})
			);
			return response.json(res);
		} catch (error) {
			return handleErrors(
				error,
				response,
				'Erro ao excluir as doenças do usuário'
			);
		}
	}
}

function cutString(value: string) {
	if (value.length > 20) {
		return value.substr(0, 20) + '....';
	} else {
		return value;
	}
}

export default AnnotationController;
