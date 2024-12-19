import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PopulationDto } from './population.dto';

@Injectable()
export class PopulationService {
  private readonly axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: 'https://',
    });
  }

  public async getPopulation(name: string): Promise<PopulationDto[]> {
    const response = await this.axios.get(
      `countriesnow.space/api/v0.1/countries/population`,
    );
    const data = response.data;

    const populations = data.data;

    const filteredPopulation = populations.find(
      ({ country }) => country.toLowerCase() === name.toLowerCase(),
    );

    const counts = filteredPopulation?.populationCounts;

    if (counts) {
      return counts.map(({ year, value }) => new PopulationDto(value, year));
    }

    return [];
  }
}
