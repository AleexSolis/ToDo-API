import Response, { ApiResponse, ValidationError } from './Response';

const errors: { [label: string]: ApiResponse } = {
  VALIDATION_ERROR: {
    status: 400,
    description: 'Validation error.',
    type: ValidationError,
  },
  UNKNOWN_ERROR: {
    status: 500,
    description: 'Unknown error.',
    type: Response,
  },
  UNAUTHORIZED: {
    status: 401,
    description: 'Unauthorized.',
    type: Response,
  },
  REGISTER_EMAIL_USERNAME_EXISTS: {
    status: 400,
    description: 'The e-mail or username already exists.',
    type: Response,
  },
  LOGIN_EMAIL_NOT_FOUND: {
    status: 404,
    description: 'The e-mail or username does not exist.',
    type: Response,
  },
  USER_NOT_FOUND: {
    status: 404,
    description: 'The user does not exist.',
    type: Response,
  },
  TASK_NOT_FOUND: {
    status: 404,
    description: 'The task does not exist.',
    type: Response,
  },
};

const NotTypeError = (error: ApiResponse) => {
  delete error.type;
  return error;
};

export { NotTypeError };
export default errors;
