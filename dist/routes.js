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
const express_1 = require("express");
const user_controller_1 = require("./controllers/user.controller");
const category_controller_1 = require("./controllers/category.controller");
const router = (0, express_1.Router)();
// Define routes
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_controller_1.getCategories)(req, res);
        res.render('showCategories', { title: 'All Categories', categories });
    }
    catch (error) {
        res.status(500).send('Error fetching categories');
    }
}));
router.post('/categories', category_controller_1.createCategory);
router.get('/add-category', (req, res) => {
    res.render('addCategory', { title: 'Add Category' });
});
router.get('/users', user_controller_1.getUsers);
router.post('/users', user_controller_1.createUser);
exports.default = router;
