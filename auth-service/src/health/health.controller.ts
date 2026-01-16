import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({ summary: 'Health check' })
    @ApiOkResponse({ type: HealthResponseDto })
    checkHealth(): HealthResponseDto {
        return {
            service: 'Auth Service',
            status: 'UP',
            timestamp: new Date().toISOString(),
        };
    }
}
