"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const user_entity_1 = require("./users/entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const users_controller_1 = require("./users/users.controller");
const config_1 = require("@nestjs/config");
const posts_module_1 = require("./posts/posts.module");
const pinned_locations_module_1 = require("./pinned-locations/pinned-locations.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(users_controller_1.UsersController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'sonace_development',
                entities: [user_entity_1.User],
                autoLoadEntities: true,
                logging: true,
                synchronize: true
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }), posts_module_1.PostsModule, pinned_locations_module_1.PinnedLocationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map