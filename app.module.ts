import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from './src/service/jwt.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimitMiddleware } from 'src/middleware/rate-limit.middleware';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controller/user.controller';
import { TokenRevocationService } from 'src/service/token-revocation.service';
import { User, UserSchema } from './src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Yobi:yobi123@atlascluster.6ucwujg.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtService, TokenRevocationService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the RateLimitMiddleware to all routes
    consumer.apply(RateLimitMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
