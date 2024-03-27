import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

export class EventIdDto {
  @ApiProperty({
    description: 'The event id',
    required: true,
  })
  eventId!: Types.ObjectId
}
