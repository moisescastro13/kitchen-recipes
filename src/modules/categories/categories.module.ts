import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
