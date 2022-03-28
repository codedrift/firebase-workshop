import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'fir-workshop-base',
  });

  await app.listen(8080);
}
bootstrap();
