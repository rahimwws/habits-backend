import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HabitsModule } from './habits/habits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        auth: {
          user: 'a0cc7180a4c318',
          pass: 'fcc220afa94c41',
        },
      },
    }),
    DatabaseModule,
    HabitsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
