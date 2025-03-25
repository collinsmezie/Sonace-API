// import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';

// import { TypeOrmModule } from '@nestjs/typeorm';  
// import { LoggerMiddleware } from './common/middlewares/logger.middleware';
// import { User } from './users/entities/user.entity';
// import { Post } from './posts/entities/post.entity';
// import { PinnedLocation } from './pinned-locations/entities/pinned-location.entity';
// // import { logger } from './middlewares/logger.middleware';
// import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { UsersController } from './users/users.controller';
// import { ConfigModule } from '@nestjs/config';
// import { PostsModule } from './posts/posts.module';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.RDS_HOST, // RDS Endpoint
//       port: Number(process.env.DB_PORT) || 5432, // Default PostgreSQL port
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       entities: [User, Post, PinnedLocation],
//       autoLoadEntities: true,
//       logging: true,
//       synchronize: true, // Consider disabling in production
//       ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // For RDS with SSL
//     }),
//     AuthModule,
//     UsersModule,
//     PostsModule
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
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
// import { logger } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { PinnedLocation } from './pinned-locations/entities/pinned-location.entity';
import { Post } from './posts/entities/post.entity';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load config first
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sonace_db',
      entities: [ User, Post, PinnedLocation ],
      autoLoadEntities: true,
      logging: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule, 
    PostsModule,
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










// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { UsersController } from './users/users.controller';
// import { User } from './users/entities/user.entity';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { loadConfig } from '../aws-ssm'; // Import function to load SSM parameters from aws-ssm.ts
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // Makes config globally available
//       // load: [async () => await loadConfig()], // Fetch AWS SSM values at startup
//     }),

//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: configService.get<number>('DB_PORT') || 5432,
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_NAME'),
//         entities: [User],
//         autoLoadEntities: true,
//         logging: true,
//         synchronize: true, // Disable in production
//         ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
//       }),
//     }),

//     AuthModule,
//     UsersModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },
//   ],
// })

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes(UsersController);
//   }
// }







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





