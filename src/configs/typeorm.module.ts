import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      synchronize: false,
      logging: true,
      migrationsRun: true,
      logger: 'file',
    }),
  ],
})
export class TypeOrmConfigModule {}
