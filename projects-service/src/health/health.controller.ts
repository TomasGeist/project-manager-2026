import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    checkHealth() {
        return { 
            service: 'Auth Service',
            status: 'UP',
            timestamp: new Date().toISOString(), 
        };
    }
}
