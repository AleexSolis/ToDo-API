import { ApiProperty } from '@nestjs/swagger';

class Response {
  @ApiProperty()
  status: number;

  @ApiProperty()
  description: string;
}

export default Response;
