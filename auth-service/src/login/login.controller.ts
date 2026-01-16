import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginPipe } from './login.pipe';
import { ApiTags, ApiOperation, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { ApiResponse } from 'src/commons/api-response';


@ApiTags('Auth')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @SwaggerApiResponse({ status: 200, type: ApiResponse })
  @SwaggerApiResponse({ status: 401, type: ApiResponse })
  create(@Body(new LoginPipe()) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

}
