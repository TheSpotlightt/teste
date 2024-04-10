import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fileupload from 'express-fileupload'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  // app.use(fileupload({
  //   useTempFiles: true,
  //   tempFileDir: "/var/task/dist/temp",
  // }))

  await app.listen(3000);
}
bootstrap();
