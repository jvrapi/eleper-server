import { Request, Response } from 'express';
import { resolve } from 'path';
import { getRepository } from 'typeorm';

import User from '../models/User';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async sendRedefineCode(request: Request, response: Response) {
    const { email } = request.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });
    if (!user) {
      return response.status(400).json({
        error: 'Usuario não existe',
      });
    }

    //Generate recovery code
    const code = Math.random().toString(36).slice(2);

    const variables = {
      name: user.name,
      title: 'Redefinição de senha',
      description: 'Segue o código para redefinição de senha',
      user_id: user.id,
      code,
    };

    // get the template path
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'ehrMail.hbs');
    try {
      await SendMailService.execute(email, variables.title, variables, npsPath);

      // saving the code in database for verification
      const setCode = userRepository.create({ ...user, code });
      await userRepository.save(setCode);

      return response.json({ message: 'E-mail enviado com sucesso' });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ error: error.message });
      }
    }
  }
}

export default SendMailController;
