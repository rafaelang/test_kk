import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedUserDTO } from './dto/user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
    description: 'User credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Authenticate a user account credential',
    type: AuthenticatedUserDTO,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): AuthenticatedUserDTO {
    return req.user;
  }
}
