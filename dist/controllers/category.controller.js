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
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../entities/category.entity"); // Import Category entity
const logger_1 = __importDefault(require("../logger")); // Import logger
const categoryController = {
    // Get all categories
    getCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryRepository = (0, typeorm_1.getRepository)(category_entity_1.Category);
            const categories = yield categoryRepository.find(); // Fetch all categories
            return categories;
        }
        catch (error) {
            logger_1.default.error('Error fetching categories', error);
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    }),
    // Create a new category
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title } = req.body;
        try {
            const categoryRepository = (0, typeorm_1.getRepository)(category_entity_1.Category);
            const category = new category_entity_1.Category(title); // Use the constructor to set the title
            yield categoryRepository.save(category); // Save new category to the database
            res.redirect('/categories');
        }
        catch (error) {
            logger_1.default.error('Error creating category', error);
            res.status(500).render('addCategory', { title: 'Add Category', error: `Error creating category ${error}` });
        }
    })
};
exports.default = categoryController;
