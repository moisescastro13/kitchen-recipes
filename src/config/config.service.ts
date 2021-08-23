import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDeveplomentEnv = process.env.NODE_ENV !== 'production';
    if (isDeveplomentEnv) {
      const envFile = __dirname + '/../../.env';
      const existFile = fs.existsSync(envFile);
      if (existFile) {
        this.envConfig = parse(fs.readFileSync(envFile));
        console.log(this.envConfig);
      }
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
