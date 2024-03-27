const os = require('os')
const dotenv = require('dotenv')

dotenv.config()

function getEnvironmentVariables() {
  if (!process.env.AUTH_PRIVATE_KEY) {
    throw new Error('AUTH_PRIVATE_KEY is required for running the application')
  }

  // This is a hack to make the private key work on mac and linux
  let privateKey = JSON.parse(`${JSON.stringify(process.env.AUTH_PRIVATE_KEY)}`)
  if (os.type() === 'Darwin') {
    privateKey = JSON.parse(`"${process.env.AUTH_PRIVATE_KEY}"`)
  }

  const all_variables = {
    MONGODB_URI: process.env.MONGODB_URI,
    DEFAULT_DB: process.env.DEFAULT_DB,
    APP_DB: process.env.DEFAULT_DB,
    PROJECT_ID: process.env.AUTH_PROJECT_ID,
    PRIVATE_KEY_ID: process.env.AUTH_PRIVATE_KEY_ID,
    PRIVATE_KEY: privateKey,
    CLIENT_EMAIL: process.env.AUTH_CLIENT_EMAIL,
    CLIENT_ID: process.env.AUTH_CLIENT_ID,
    CLIENT_X509_CERT_URL: process.env.AUTH_CLIENT_CERT_URL,
    STORAGE_BUCKET: process.env.AUTH_STORAGE_BUCKET,
    MONGO_HOST: process.env.DB_HOST,
    MONGO_PORT: process.env.DB_PORT,
    MONGO_USER: process.env.DB_ROOT_USERNAME,
    MONGO_PASSWORD: process.env.DB_ROOT_PASSWORD,
    PRIVATE_KEY_V2: process.env.PRIVATE_KEY_V2,
    PRIVATE_KEY_ADMIN_V2: process.env.PRIVATE_KEY_ADMIN_V2,
  }

  return all_variables
}

module.exports = getEnvironmentVariables
