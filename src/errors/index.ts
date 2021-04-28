import { Response } from 'express';
import * as Yup from 'yup';

function handleErrors(err: Error, response: Response, errorMessage: string) {
  const validationErrors: Record<string, string> = {};

  if (err instanceof Yup.ValidationError) {
    err.inner.forEach((error) => {
      const errorPath = error.path ? error.path : 'error';
      console.log(error.path);
      validationErrors[errorPath] = error.message;
    });

    return response.status(500).json(validationErrors);
  }
  return response.status(500).json({ error: errorMessage });
}

export default handleErrors;
