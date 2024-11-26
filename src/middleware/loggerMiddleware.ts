import { Request, Response, NextFunction } from 'express';
import logger from '../logger'; // Import the logger

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;