import { Module } from '@nestjs/common';
import { DatabaseProviders } from './services/database.service';

@Module({
  imports: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DataBaseModule {}
