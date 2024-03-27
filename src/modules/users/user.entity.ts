import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })
  uid: string

  @Prop({required: true })
  name: string

  @Prop({required: true })
  lastName: string

  @Prop({ required: true })
  email: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventsAttending?:  mongoose.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
