import { Controller, Get, Param } from "@nestjs/common";
import type { BordersDto } from "./Borders.dto";
import { BordersService } from './borders.service';

@Controller('borders')
export class BordersController {
  constructor(private readonly bordersService: BordersService) {}

  @Get(':code')
  public async getBorders(
    @Param('code') code: string,
  ): Promise<BordersDto> {
    return this.bordersService.getBorders(code);
  }
}
