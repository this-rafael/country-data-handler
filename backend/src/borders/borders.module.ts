import { Module } from '@nestjs/common';
import { BordersService } from './borders.service';
import { BordersController } from './borders.controller';

@Module({
  controllers: [BordersController],
  providers: [BordersService],
})
export class BordersModule {}
