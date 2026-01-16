import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'Auth Service' })
  service: string;

  @ApiProperty({ example: 'UP' })
  status: string;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;
}
