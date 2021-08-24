import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DataBaseModule } from './Database/DataBase.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';

@Module({
  imports: [UserModule, DataBaseModule, AuthModule, RoleModule, ConfigModule],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _config: ConfigService) {
    AppModule.port = this._config.get(Configuration.PORT);
  }
}
