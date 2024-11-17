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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const client = new elasticsearch_1.Client({
    node: 'http://localhost:9200', // Assuming Elasticsearch is running locally on port 9200
});
class UserController {
    // Get all users from Elasticsearch
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield client.search({
                    index: 'users', // Specify the Elasticsearch index to search
                    body: {
                        query: {
                            match_all: {}, // Match all documents in the index
                        },
                    },
                });
                res.json(response.hits.hits); // Return the users in the response
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // Add a new user to Elasticsearch
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, phone } = req.body;
            try {
                yield client.index({
                    index: 'users', // Specify the Elasticsearch index
                    id: id.toString(), // Use the ID provided in the request
                    body: {
                        name,
                        phone,
                    },
                });
                res.status(201).json({ message: 'User added' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
