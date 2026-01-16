import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [ProjectsModule],
  controllers: [HealthController],
})
export class AppModule {}
