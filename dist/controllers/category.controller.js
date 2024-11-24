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
exports.createCategory = exports.getCategories = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../entities/category.entity"); // Import Category entity
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryRepository = (0, typeorm_1.getRepository)(category_entity_1.Category);
        const categories = yield categoryRepository.find(); // Fetch all categories
        return categories;
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});
exports.getCategories = getCategories;
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const categoryRepository = (0, typeorm_1.getRepository)(category_entity_1.Category);
        const category = new category_entity_1.Category(title); // Use the constructor to set the title
        yield categoryRepository.save(category); // Save new category to the database
        res.redirect('/categories');
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
});
exports.createCategory = createCategory;
