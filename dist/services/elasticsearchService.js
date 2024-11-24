"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndCreateIndex = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new elasticsearch_1.Client({ node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200', requestTimeout: 60000 });
const index = process.env.ELASTICSEARCH_INDEX || 'users';
const checkAndCreateIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const indexExists = yield client.indices.exists({ index });
    if (!indexExists) {
        yield client.indices.create({
            index,
            body: {
                mappings: {
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'text' },
                        phone: { type: 'text' }
                    }
                }
            }
        });
        console.log(`Index ${index} created`);
    }
    else {
        console.log(`Index ${index} already exists`);
    }
});
exports.checkAndCreateIndex = checkAndCreateIndex;
