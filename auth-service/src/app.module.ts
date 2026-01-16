import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TokenService } from './token/token.service';
import { HealthController } from './health/health.controller';


@Module({
  imports: [LoginModule],
  providers: [TokenService],
  controllers: [HealthController],
})
export class AppModule {}
