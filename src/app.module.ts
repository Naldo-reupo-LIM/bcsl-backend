import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { FirebaseAuthStrategy } from './modules/firebase-auth/firebase-auth.strategy'
import { HealthController } from './modules/health-service/health.controller'

import getEnvironmentVariables from './infrastructure/environment'
import { EventModule } from './modules/events/event.module'
import { HeadquarterModule } from './modules/headquarter/headquarter.module'
import { UserModule } from './modules/users/user.module'
import { PassportModule } from '@nestjs/passport'
import { FirebaseModule } from './modules/firebase-auth/firebase.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [getEnvironmentVariables],
          isGlobal: true,
        }),
        UserModule,
        EventModule,
        HeadquarterModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        FirebaseModule,
      ],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_USER')}:${configService.get(
          'MONGO_PASSWORD'
        )}@${configService.get('MONGO_HOST')}:${configService.get(
          'MONGO_PORT'
        )}/${configService.get('DEFAULT_DB')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthController],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
