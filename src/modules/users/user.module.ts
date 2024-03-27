import { Logger, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User} from './user.entity'


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [],
  providers: [Logger],
  exports: [MongooseModule],
})
export class UserModule {}
