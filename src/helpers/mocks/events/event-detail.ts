import { Types } from 'mongoose'

import { CreateEventDto, EventStatus } from '../../../modules/events/dto/create-event.dto'
import { EventResponse } from '../../../modules/events/interfaces/event-response'
import { UpdateEventDto } from '../../../modules/events/dto/update-event.dto'
import { AddAttendeeToEventDto } from '../../../modules/events/dto/add-attendee-to-event.dto'

export const EVENT_ID_MOCK = new Types.ObjectId('65c516a7eae2b91375ecba6e')
export const USER_ID_MOCK = new Types.ObjectId('65a9ae1f615ad496533cde52')
export const MOCK_HEADQUARTER = {
  _id: new Types.ObjectId('654d4ac398b7a0abaa3c3a40'),
  name: 'Panamá',
}
export const MOCK_OWNER = '2qWPHHeRY9b3ouN8deae8GkCUnx1'

export const EVENT_RESPONSE_MOCK: EventResponse = {
  _id: EVENT_ID_MOCK,
  name: 'Storm',
  eventDate: new Date('2023-11-21T19:00:00.000'),
  owner: '2qWPHHeRY9b3ouN8deae8GkCUnx1',
  type: 'Recruiting',
  tags: 'Architecture',
  headquarter: MOCK_HEADQUARTER,
  description: 'A description',
  address: '2323 El Dorado Avenue',
  attendees: [USER_ID_MOCK],
  status: EventStatus.ACTIVE,
  year: '2024',
}

export const CREATE_EVENT_MOCK_DTO: CreateEventDto = {
  name: 'Storm',
  eventDate: new Date('2024-11-21T19:00:00.000'),
  type: 'Recruiting',
  tags: 'Architecture',
  headquarter: MOCK_HEADQUARTER,
  description: 'A description',
  userId: '1234',
  address: '2323 El Dorado Avenue',
}

export const UPDATE_EVENT_MOCK_DTO: UpdateEventDto = {
  description: 'Updated Description',
  address: 'Updated Address',
}

export const LIST_EVENT_MOCK: EventResponse[] = [
  {
    _id: EVENT_ID_MOCK,
    eventDate: new Date('2024-11-21T19:00:00.000'),
    tags: 'Design',
    name: 'Values11 Day',
    year: '2024',
    type: 'Sales',
    owner: 'asif',
    status: EventStatus.ACTIVE,
    address: '85 Salvio Street',
    description: 'A description',
    headquarter: MOCK_HEADQUARTER,
  },
  {
    _id: EVENT_ID_MOCK,
    eventDate: new Date('2024-11-21T19:00:00.000'),
    tags: 'Design',
    name: 'Values11 Day2',
    year: '2022',
    type: 'Sales',
    owner: 'asif',
    status: EventStatus.ACTIVE,
    address: '85 Salvio Street',
    description: 'A description',
    headquarter: MOCK_HEADQUARTER,
  },
  {
    _id: EVENT_ID_MOCK,
    eventDate: new Date('2024-11-21T19:00:00.000'),
    tags: 'Design',
    name: 'Values11 Day3',
    year: '2024',
    type: 'Sales',
    owner: 'asif',
    status: EventStatus.ACTIVE,
    address: '85 Salvio Street',
    description: 'A description',
    headquarter: MOCK_HEADQUARTER,
  },
]

export const UPDATE_EVENT_DTO_MOCK: UpdateEventDto = {
  eventDate: new Date('2023-11-21T19:00:00.000'),
  status: EventStatus.CREATED,
  year: '2023',
}

export const ATTENDEE_DATA_MOCK: AddAttendeeToEventDto = {
  name: 'User',
  lastName: 'App',
  email: 'testuser@chupito.com',
}
