import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(<string>configService.get('POSTGRES_PORT'), 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development', // Sync only in development
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        migrationsRun: configService.get('NODE_ENV') === 'production', // Run migrations in prod
        ssl:
          configService.get('NODE_ENV') === 'production'
            ? {
                rejectUnauthorized:
                  configService.get('POSTGRES_SSL_REJECT_UNAUTHORIZED') ===
                  'true',
              }
            : false,
      }),
    }),
  ],
})
export class DatabaseModule {}