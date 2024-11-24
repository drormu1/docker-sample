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
exports.createUser = exports.getUsers = void 0;
const elasticsearchService_1 = require("../services/elasticsearchService");
const elasticsearch_1 = require("@elastic/elasticsearch");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new elasticsearch_1.Client({ node: 'http://localhost:9200' });
const index = process.env.ELASTICSEARCH_INDEX || 'users';
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, elasticsearchService_1.checkAndCreateIndex)(); // Ensure the index exists
        const response = yield client.search({
            index,
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        const users = response.hits.hits.map((hit) => hit._source);
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error); // Log the error details 
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
exports.getUsers = getUsers;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone } = req.body;
    try {
        yield (0, elasticsearchService_1.checkAndCreateIndex)(); // Ensure the index exists
        const response = yield client.index({
            index,
            body: {
                name,
                phone
            }
        });
        res.status(201).json({ message: 'User created successfully', user: response });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
