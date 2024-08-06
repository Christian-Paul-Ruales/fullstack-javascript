import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  /**
   * Dejamos un unico metodo run seed
   */
  @Get()
  runSeed() {
    return this.seedService.populateDB();
  }
}
