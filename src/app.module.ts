import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_UID,
        password: process.env.DB_PWD,
        // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: false,
        options: {
          encrypt: false,
        },
      }),
    }),
    ProductModule,
  ],
  providers: [AppService],
})
export class AppModule {}
