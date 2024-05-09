import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [PostsService],
  imports: [DatabaseModule]
})
export class PostsModule {}
