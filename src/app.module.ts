// import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';  
// import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { User } from './users/entities/user.entity';
// // import { logger } from './middlewares/logger.middleware';
// import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { UsersController } from './users/users.controller';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'dpg-cu3vbi1u0jms73dpuf70-a',
//       port: 5432,
//       username: 'sonace_development_user',
//       password: 'QpcVjOjDCojlD3LwypFme4AdsMEgcuJK',
//       database: 'sonace_development',
//       entities: [ User ],
//       autoLoadEntities: true,
//       logging: true,
//       synchronize: true
//     }),
//     AuthModule,
//     UsersModule, 
//     ConfigModule.forRoot({
//       isGlobal: true, // Makes the config globally available
//     }),
//   ],
//   controllers: [AppController],
//   providers: [
//   AppService,  
//   {
//     provide: APP_GUARD,
//     useClass: JwtAuthGuard,
//   }
//   ],
// })

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       // .forRoutes({ path: 'sessions', method: RequestMethod.POST });
//       // .exclude(
//       //   { path: 'sessions', method: RequestMethod.GET },
//       //   { path: 'sessions/:id', method: RequestMethod.DELETE }
//       // )
//       .forRoutes(UsersController);
//   }
// }





import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { User } from './users/entities/user.entity';
// import { logger } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { PinnedLocationsModule } from './pinned-locations/pinned-locations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sonace_development',
      entities: [ User ],
      autoLoadEntities: true,
      logging: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }), PostsModule, PinnedLocationsModule,
  ],
  controllers: [AppController],
  providers: [
  AppService,  
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: 'sessions', method: RequestMethod.POST });
      // .exclude(
      //   { path: 'sessions', method: RequestMethod.GET },
      //   { path: 'sessions/:id', method: RequestMethod.DELETE }
      // )
      .forRoutes(UsersController);
  }
}