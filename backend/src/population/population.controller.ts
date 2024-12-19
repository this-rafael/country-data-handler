import { Controller, Get, Param } from '@nestjs/common';
import { PopulationDto } from './population.dto';
import { PopulationService } from './population.service';

@Controller('population')
export class PopulationController {
  constructor(private readonly populationService: PopulationService) {}
  @Get(':name')
  public async getPopulation(
    @Param('name') name: string,
  ): Promise<PopulationDto[]> {
    return this.populationService.getPopulation(name);
  }
}
