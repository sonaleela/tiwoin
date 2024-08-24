import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
    @Get()
    async healthCheck() {
        return `Tiwoin serving - ${process.env.NODE_ENV}`;
    }
}
