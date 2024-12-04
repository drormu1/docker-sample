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
const dotenv_1 = __importDefault(require("dotenv"));
const typeormService_1 = require("./services/typeormService"); // Import database connection
const routes_1 = __importDefault(require("./routes")); // Import routes
const express_handlebars_1 = require("express-handlebars");
const logger_1 = __importDefault(require("./logger")); // Import logger
const loggerMiddleware_1 = __importDefault(require("./middleware/loggerMiddleware"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies
app.use(express_1.default.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data
// Use logger middleware
app.use(loggerMiddleware_1.default);
// // Set up Handlebars
// handlebarsLayouts(Handlebars);
// const hbs = exphbs.create({
//         helpers: {
//             layouts: handlebarsLayouts(Handlebars)
//         }
// });
// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars');
// app.set('views', './src/views');
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', './dist/views');
app.enable('view cache');
// Serve static files from the public folder
app.use(express_1.default.static('public'));
// Use routes without /api prefix
app.use('/', routes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeormService_1.connectDatabase)(); // Ensure the database is connected
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Error connecting to the database', error);
        process.exit(1); // Exit if the connection fails
    }
});
startServer();
exports.default = app;
