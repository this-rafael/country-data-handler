import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PopulationModule } from './population/population.module';
import { BordersModule } from './borders/borders.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [CountriesModule, BordersModule, PopulationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
