import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import type { CountryDto } from './country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/')
  public async getCountries(): Promise<CountryDto[]> {
    return this.countriesService.getCountries();
  }
}
