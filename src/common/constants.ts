import getEnvironmentVariables from '../infrastructure/environment';

const {
  PROJECT_ID,
  PRIVATE_KEY_ADMIN_V2,
  CLIENT_EMAIL,
  STORAGE_BUCKET,
} = getEnvironmentVariables();


export const ADMIN_ROLE = 'admin'
export const USER_ROLE = 'user'
export const FIREBASE_APP_V2 = 'Chupitos v2'

export const FIREBASE_SERVICE_ACCOUNT = {
  projectId:  PROJECT_ID,
  privateKey: PRIVATE_KEY_ADMIN_V2.replace(/\\n/g, '\n'),
  clientEmail: CLIENT_EMAIL,
}

export const FIREBASE_STORAGE_BUCKET = STORAGE_BUCKET

