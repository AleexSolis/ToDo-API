/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

class Response {
  @ApiProperty()
  status: number;

  @ApiProperty()
  description: string;
}

class ApiResponse {
  status: number;
  description: string;
  type?: Type<unknown> | Function | [Function] | string;
}

class ValidationError {
  @ApiProperty()
  message: Array<string>;
}

export { ApiResponse, ValidationError };
export default Response;
