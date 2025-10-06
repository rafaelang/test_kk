import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class AuthenticatedUserDTO {
  @ApiProperty({
    description: 'Name user',
    example: 'name of user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'User Id',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'refresh token',
    example: 'secret key',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
