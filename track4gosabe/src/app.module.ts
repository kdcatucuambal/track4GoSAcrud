import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    url: "postgres://postgres:postgres@localhost:5432/usersdb",
    entities: [User],
    synchronize: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// https://github.com/ThomasOliver545/nestjs-dockerized/blob/master/docker-compose.yml
