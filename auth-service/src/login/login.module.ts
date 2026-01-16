import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, TokenService],
})
export class LoginModule {}
