
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Request...');
    console.log(`[LoggerMiddleware] Request made to: ${req.method} ${req.url}`);
    //log user to console
    console.log(`[LoggerMiddleware] User: ${req.user}`);
    next();
  }
}



// import { Request, Response, NextFunction } from 'express';

// export function logger(req: Request, res: Response, next: NextFunction) {
//   // console.log(`Request...`);
//   console.log(`[LoggerMiddleware] Request made to: ${req.method} ${req.url}`);
//   next();
// };
