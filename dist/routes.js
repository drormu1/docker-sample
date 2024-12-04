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
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const category_controller_1 = __importDefault(require("./controllers/category.controller"));
const router = (0, express_1.Router)();
// Define routes for categories
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_controller_1.default.getCategories(req, res);
        res.render('categories', { title: 'All Categories', categories });
    }
    catch (error) {
        res.status(500).send('Error fetching categories');
    }
}));
router.post('/categories', category_controller_1.default.createCategory);
router.get('/add-category', (req, res) => {
    res.render('addCategory', { title: 'Add Category' });
});
// Define routes for users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_controller_1.default.getUsers(req, res);
        //res.render('showUsers', { title: 'All Users', users });
        res.render('showUsers', { layout: 'main', users, title: 'All Users' });
    }
    catch (error) {
        res.status(500).send('Error fetching users');
    }
}));
router.post('/users', user_controller_1.default.createUser);
router.get('/add-user', (req, res) => {
    res.render('addUser', { title: 'Add User' });
});
router.get('/test', (req, res) => {
    res.send('response from test route');
});
router.get('/', (req, res) => {
    //res.send('response from root route');
    res.redirect('/categories');
});
exports.default = router;
