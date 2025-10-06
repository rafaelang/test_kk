import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username for auth',
    example: 'cliente',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for auth',
    example: 'password',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
