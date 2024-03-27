print('Start #################################################################')

db.createCollection('users')
db.createCollection('events')
db.createCollection('attendees')
db.createCollection('roles')

var headquarters = [
  {
    name: 'Bogota',
  },
  {
    name: 'Panama',
  },
  {
    name: 'Lima',
  },
]

var roles = [
  {
    name: 'Admin',
  },
  {
    name: 'Sales',
  },
  {
    name: 'Marketing',
  },
]

var users = [
  {
    uid: 'sRrmUhxMgrhA1WeMyQp9CzzxyO92',
    firstName: 'User',
    lastName: 'App',
    isAdmin: false,
    email: 'testuser@chupito.com',
    isSuperAdmin: false,
  },
  {
    uid: '2qWPHHeRY9b3ouN8deae8GkCUnx1',
    firstName: 'User',
    lastName: 'Admin',
    isAdmin: true,
    email: 'adminuser@chupito.com',
    isSuperAdmin: false,
  },
]

var events = []

db.headquarters.insert(headquarters)
db.roles.insert(roles)
db.users.insert(users)

// TODO: get role and then set role in user
// db.getCollection('test').find()

print('END #################################################################')
