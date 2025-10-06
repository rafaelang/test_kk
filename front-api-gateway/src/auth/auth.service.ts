import { Injectable } from '@nestjs/common';
import { AuthenticatedUserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username == 'cliente' && password == 'password') {
      const payload = {
        username: username,
        sub: 100,
      };
      const auser = new AuthenticatedUserDTO();
      auser.userId = 100;
      auser.username = username;
      auser.refresh_token = this.jwtService.sign(payload);
      return auser;
    }
    return null;
  }
}
