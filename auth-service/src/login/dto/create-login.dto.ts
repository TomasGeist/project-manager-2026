import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ example: 'strongPassword', minLength: 6 })
    password: string;
}
