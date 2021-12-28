import { BadRequestException, ValidationError } from '@nestjs/common';
import errors from '../responses/error';

const exceptionFactory = (exceptions: ValidationError[]) => {
  const newExceptions = exceptions.map(({ property, constraints }) => ({
    field: property,
    message: Object.values(constraints).join(', '),
    validation: Object.keys(constraints).join(', '),
    constraints,
  }));

  throw new BadRequestException({
    status: errors.VALIDATION_ERROR.status,
    description: errors.VALIDATION_ERROR.description,
    errors: newExceptions,
  });
};

export { exceptionFactory };
