import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  CountryBasicInfoDto,
  type CountryDto,
  CountryImageDto,
} from './country.dto';

@Injectable()
export class CountriesService {
  private axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: 'https://',
    });
  }

  public async getCountries(): Promise<CountryDto[]> {
    const [infoData, imageDate] = await Promise.all([
      this.fetchCountriesInfo(),
      this.fetchCountryImage(),
    ]);

    return this.relateCountryInfoAndImage(infoData, imageDate);
  }

  private async fetchCountriesInfo(): Promise<CountryBasicInfoDto[]> {
    const response = await this.axios.get(
      'date.nager.at/api/v3/AvailableCountries',
    );

    return response.data.map(
      ({ countryCode, name }) => new CountryBasicInfoDto(name, countryCode),
    );
  }

  private async fetchCountryImage(): Promise<CountryImageDto[]> {
    const endpoint = 'countriesnow.space/api/v0.1/countries/flag/images';

    const response = await this.axios.get(endpoint);
    const responseData = response.data;
    const imagesData = responseData.data;

    return imagesData.map(({ flag, iso2 }) => new CountryImageDto(flag, iso2));
  }

  public async relateCountryInfoAndImage(
    countries: CountryBasicInfoDto[],
    images: CountryImageDto[],
  ): Promise<CountryDto[]> {
    return countries
      .map((country) => {
        const image = images.find((img) => img.code === country.code);
        if (image) {
          return {
            ...country,
            imageUrl: image.imageUrl,
          };
        }
        return null;
      })
      .filter((country) => country !== null) as CountryDto[];
  }
}
