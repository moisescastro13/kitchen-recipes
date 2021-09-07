import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DataBaseModule } from './Database/DataBase.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { RecipeModule } from './modules/recipe/recipe.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    UserModule,
    DataBaseModule,
    AuthModule,
    RoleModule,
    ConfigModule,
    RecipeModule,
    IngredientsModule,
    CategoriesModule,
  ],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _config: ConfigService) {
    AppModule.port = this._config.get(Configuration.PORT);
  }
}
