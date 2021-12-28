import Response from './Response';

const errors = {
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
};

export default errors;
