import { OmitType } from '@nestjs/swagger';
import { Session } from 'src/auth/entities';
import { User } from 'src/modules/users/entities/user.entity';

const responses = {
  WELCOME_MESSAGE: {
    status: 200,
    description: 'Welcome message.',
  },
  REGISTER_SUCCESS: {
    status: 200,
    description: 'Register successfully.',
    type: OmitType(User, ['password']),
  },
  LOGIN_SUCCESS: {
    status: 200,
    description: 'Login successfully.',
    type: Session,
  },
  PROFILE_SUCCESS: {
    status: 200,
    description: 'Profile successfully.',
    type: OmitType(User, ['password']),
  },
  GET_USER_BY_ID_SUCCESS: {
    status: 200,
    description: 'Get user by id successfully.',
    type: OmitType(User, ['password']),
  },
  UPDATE_USER_SUCCESS: {
    status: 200,
    description: 'Update user successfully.',
    type: OmitType(User, ['password']),
  },
};

export default responses;
