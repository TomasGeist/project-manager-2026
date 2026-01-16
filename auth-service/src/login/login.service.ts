import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { RESPONSE_CODES } from 'src/commons/codes-response';
import { ApiResponse } from 'src/commons/api-response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LoginService {

  constructor(private readonly TokenService: TokenService) {}

  create(createLoginDto: CreateLoginDto, ) {
    const BDD_SIMULATE = [{
      id: 1,
      email: 'test_user@example.com',
      password: 'test_password',
    }];

    const user = BDD_SIMULATE.find(user => 
      user.email === createLoginDto.email && user.password === createLoginDto.password
    );

    let response = new ApiResponse();

    if (user) {
    const token = this.TokenService.generateToken({ userId: user.id });
    response.UpdateResponse(RESPONSE_CODES.SUCCESS, 'Login successful', { token });
    } else {
      response.UpdateResponse(RESPONSE_CODES.UNAUTHORIZED, 'Invalid credentials', null);
    }

    return response;
  }

}
