import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_APP_V2, FIREBASE_SERVICE_ACCOUNT, FIREBASE_STORAGE_BUCKET } from '../../common/constants';

@Injectable()
export class FirebaseAdminService {
  private static instance: admin.app.App;

  onModuleInit() {
    if (!FirebaseAdminService.instance) {
      FirebaseAdminService.instance = admin.initializeApp(
        {
          credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
          storageBucket: FIREBASE_STORAGE_BUCKET,
        }, 
        FIREBASE_APP_V2
      );
    }
  }

  getStorage() {
    return FirebaseAdminService.instance.storage();
  }
}
