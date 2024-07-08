import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HabitsModule } from './habits/habits.module';
import { UserModule } from './user/user.module';
import { FriendsModule } from './friends/friends.module';
import { RequestsService } from './requests/requests.service';
import { RequestsModule } from './requests/requests.module';
import { StatisticsModule } from './statistics/statistics.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '81d078093a65d4',
          pass: '0b6dd8d32017ac',
        },
      },
    }),
    DatabaseModule,
    HabitsModule,
    UserModule,
    FriendsModule,
    RequestsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestsService],
})
export class AppModule {}
