import { OmitType } from '@nestjs/swagger';
import { Session } from 'src/auth/entities';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiResponse } from './Response';

const responses: { [label: string]: ApiResponse } = {
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
  TASK_SUCCESS: {
    status: 201,
    description: 'Task successfully.',
    type: Task,
  },
  TASKS_SUCCESS: {
    status: 200,
    description: 'Tasks successfully.',
    type: [Task],
  },
  TASK_DELETE_SUCCESS: {
    status: 200,
    description: 'Task delete successfully.',
  },
};

export default responses;
