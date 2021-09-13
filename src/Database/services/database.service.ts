import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'tls';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.keys';

export const DatabaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        port: Number(config.get(Configuration.DBPORT)),
        dropSchema: true,
        synchronize: true,
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
