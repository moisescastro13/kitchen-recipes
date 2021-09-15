import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(UserEntity)().createMany(10);
  }
}
