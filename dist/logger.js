"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Define the log directory
const logDirectory = 'c:/logs/dockersample';
const logger = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    })),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File({ filename: path_1.default.join(logDirectory, 'error.log'), level: 'error' }),
        new winston_1.transports.File({ filename: path_1.default.join(logDirectory, 'combined.log') })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
    }));
}
exports.default = logger;
