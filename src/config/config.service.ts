import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      host: '192.168.1.4', //this.getValue('DB_HOST'),
      port: 3307, //parseInt(this.getValue('DB_PORT')),
      username: 'root', //this.getValue('DB_USER'),
      password: '123456', //this.getValue('DB_PASSWORD'),
      database: 'prueba', //this.getValue('DB_DATABASE'),

      entities: ['**/*.entity.js'],
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };
