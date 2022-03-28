import { Controller, Get } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('toggle')
  async togglednd() {
    const db = getFirestore();
    // replace user id with your own
    const docRef = db.collection('users').doc('WgztCmi2PxgnM1IQ0uHVlCKWgbJ3');
    const userData = (await docRef.get()).data();

    console.log(userData);

    await docRef.set(
      {
        dnd: !userData.dnd,
      },
      {
        merge: true,
      },
    );
  }
}
