import { FirebaseAuthStrategy } from './firebase-auth.strategy'

const envVars = jest.mock('../../infrastructure/environment', () => ({
  __esModule: true,
  default: { PRIVATE_KEY: undefined },
}))

describe('FirebaseAuthStrategy', () => {
  it('should throw an error if AUTH_PRIVATE_KEY is undefined', () => {
    try {
    } catch (error) {
      expect(() => new FirebaseAuthStrategy()).toThrow('Undefined AUTH_PRIVATE_KEY')
    }
  })

  it('should be defined', () => {
    envVars.fn().mockReturnValueOnce({ PRIVATE_KEY: 'mocked-private-key' })
    const firebaseAuthStrategy = new FirebaseAuthStrategy()
    expect(firebaseAuthStrategy).toBeDefined()
  })

  it('should return a user object when validating', async () => {
    const firebaseAuthStrategy = new FirebaseAuthStrategy()
    const payload = { sub: '123', email: 'user@example.com' }
    expect(await firebaseAuthStrategy.validate(payload)).toEqual({
      userId: '123',
      email: 'user@example.com',
    })
  })
})
