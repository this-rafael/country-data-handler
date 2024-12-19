export class CountryDto {
  public name: string;
  public code: string;
  public imageUrl: string;

  public constructor(name: string, code: string, imageUrl: string) {
    this.name = name;
    this.code = code;
    this.imageUrl = imageUrl;
  }
}

export class CountryBasicInfoDto {
  public constructor(
    public readonly name: string,
    public readonly code: string,
  ) {}
}

export class CountryImageDto {
  public constructor(
    public readonly imageUrl: string,
    public readonly code: string,
  ) {}
}
