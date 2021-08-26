import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from '../controllers/ingredients.controller';
import { IngredientService } from '../services/ingredients.service';

describe('IngredientsController', () => {
  let controller: IngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [IngredientService],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
