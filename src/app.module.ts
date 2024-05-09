import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './exception-filters/optimized-exceptions-filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { AuthGuard } from './auth/auth.guard';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 1,
      },
    ]),
    AuthModule,
    UsersModule,
    DatabaseModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    PostsService
  ],
})
export class AppModule {}
