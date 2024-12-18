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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
var express = require("express");
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var app = express();
var cors = require('cors');
var prisma = new client_1.PrismaClient();
var UserCreationService_1 = require("../src/services/UserCreationService");
app.use(cors());
app.use(express.json());
function excludePasswordFromUsers(users) {
    return users.map(function (user) {
        var password = user.password, email = user.email, rest = __rest(user, ["password", "email"]);
        return rest;
    });
}
function excludePasswordForUser(user) {
    var password = user.password, email = user.email, newUserObject = __rest(user, ["password", "email"]);
    return newUserObject;
}
app.get('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, usersFiltered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.users.findMany({
                    include: {
                        pets: true
                    }
                })];
            case 1:
                users = _a.sent();
                usersFiltered = excludePasswordFromUsers(users);
                res.json(usersFiltered);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, filteredUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.users.findUnique({
                        where: {
                            id: Number(id)
                        },
                        include: {
                            pets: true
                        },
                    })];
            case 1:
                user = _a.sent();
                filteredUser = excludePasswordForUser(user);
                res.json(filteredUser);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/users/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, sanitizedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.users.findUnique({
                        where: {
                            email: email,
                        },
                        include: {
                            pets: true
                        }
                    })];
            case 1:
                user = _b.sent();
                if (user && bcrypt.compareSync(password, user.password)) {
                    sanitizedUser = excludePasswordForUser(user);
                    res.json({ isAuthorized: true, user: sanitizedUser });
                }
                else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
                return [2 /*return*/];
        }
    });
}); });
// create an endpoint that adds a user to the database 
app.post('/api/users/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new UserCreationService_1.default(req)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(500).json({ error: 'An error occurred while creating the user' });
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/users/match/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.users.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            matches: {
                                connect: req.body.id
                            }
                        }
                    })];
            case 1:
                match = _a.sent();
                res.json(match);
                return [2 /*return*/];
        }
    });
}); });
app.listen(8000, function () { return console.log('Server listening on port 8000'); });
