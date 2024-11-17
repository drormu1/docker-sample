"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../entities/category.entity"); // Import Category entity
const sql = __importStar(require("mssql"));
const sqlConfig = {
    user: 'sa',
    password: 'Password_01',
    server: 'localhost',
    port: 1433,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield sql.connect(sqlConfig);
        yield pool.request().query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DockerSample')
                                    CREATE DATABASE DockerSample`);
        console.log('Database created or already exists');
        yield pool.close();
    }
    catch (err) {
        console.error('Error creating database', err);
    }
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createDatabase(); // Ensure the database exists
    try {
        yield (0, typeorm_1.createConnection)({
            type: 'mssql',
            host: 'localhost',
            port: 1433, // Default SQL Server port
            username: 'sa',
            password: 'Password_01',
            database: 'DockerSample',
            synchronize: true, // Automatically sync database schema with entities
            logging: true,
            entities: [category_entity_1.Category],
            options: {
                enableArithAbort: true, // Add this line to avoid deprecation warning
                encrypt: true // Use encryption
            }
        });
        console.log('Connected to SQL Server successfully');
    }
    catch (error) {
        console.error('Error connecting to SQL Server', error);
        process.exit(1); // Exit if the connection fails
    }
});
exports.connectDatabase = connectDatabase;