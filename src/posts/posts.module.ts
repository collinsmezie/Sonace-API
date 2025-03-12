// import { Module } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { PostsController } from './posts.controller';

// @Module({
//   controllers: [PostsController],
//   providers: [PostsService],
// })
// export class PostsModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { PinnedLocation } from '../pinned-locations/entities/pinned-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PinnedLocation])], // ✅ Import repositories
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService], // ✅ Export service if needed in other modules
})
export class PostsModule {}
