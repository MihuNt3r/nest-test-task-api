import { Module } from '@nestjs/common';
import AppServicesModule from 'src/services/app-services.module'

@Module({
  imports: [AppServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
