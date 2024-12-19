import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { BordersDto } from './Borders.dto';

@Injectable()
export class BordersService {
  private readonly axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: 'https://',
    });
  }

  public async getBorders(code: string): Promise<BordersDto> {
    const response = await this.axios.get(
      `date.nager.at/api/v3/CountryInfo/${code}`,
    );
    const data = response.data;

    const borders = data.borders;

    if (borders) {
      return new BordersDto(borders.map((border) => border.officialName));
    }

    return new BordersDto([]);
  }
}
