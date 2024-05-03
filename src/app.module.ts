import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArtistsModule } from './artists/artists.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions-filter';

@Module({
  imports: [
    ArtistsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 1,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
