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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const category_controller_1 = require("./controllers/category.controller");
const typeormService_1 = require("./services/typeormService"); // Import database connection
const user_controller_1 = require("./controllers/user.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeormService_1.connectDatabase)(); // Ensure the database is connected
        // Define routes
        app.get('/categories', category_controller_1.getCategories);
        app.post('/categories', category_controller_1.createCategory);
        const userController = new user_controller_1.UserController();
        app.get('/users', userController.getUsers);
        app.post('/users', userController.addUser);
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1); // Exit if the connection fails
    }
});
startServer();
exports.default = app;
