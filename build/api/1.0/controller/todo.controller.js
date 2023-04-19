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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoController = void 0;
var utils_1 = require("utils");
var model_1 = require("model");
var ToDoController = /** @class */ (function () {
    function ToDoController() {
        this.routes = [];
        this.routes.push({
            handler: this.getAllTodo,
            method: "GET",
            path: "/todo",
        });
        this.routes.push({
            handler: this.GetTodoById,
            method: "GET",
            path: "/todo/:id",
        });
        this.routes.push({
            handler: this.UpdateTodoById,
            method: "PUT",
            path: "/todo/:id",
        });
        this.routes.push({
            handler: this.AddNewTodo,
            method: "POST",
            path: "/todo",
        });
        this.routes.push({
            handler: this.DeleteTodoById,
            method: "DELETE",
            path: "/todo/:id",
        });
        this.routes.push({
            handler: this.ToggleTodo,
            method: "PUT",
            path: "/todo/toggle/:id",
        });
    }
    ToDoController.prototype.getAllTodo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.Todo.find().sort({ createdAt: -1 })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, data)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToDoController.prototype.GetTodoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.Todo.findById({ _id: req.params.id })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, data)];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToDoController.prototype.AddNewTodo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, task, title, newTodo, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, task = _a.task, title = _a.title;
                        return [4 /*yield*/, new model_1.Todo({ task: task, title: title }).save()];
                    case 1:
                        newTodo = _b.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(newTodo.title, " is created!"))];
                    case 2:
                        err_3 = _b.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToDoController.prototype.UpdateTodoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, task, title, updateTodo, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, task = _a.task, title = _a.title;
                        return [4 /*yield*/, model_1.Todo.findOneAndUpdate({ _id: req.params.id }, { $set: { task: task, title: title } })];
                    case 1:
                        updateTodo = _b.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(updateTodo, " is updated!"))];
                    case 2:
                        err_4 = _b.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToDoController.prototype.ToggleTodo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, yourData, data, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, model_1.Todo.findById({ _id: id })];
                    case 1:
                        yourData = _a.sent();
                        return [4 /*yield*/, model_1.Todo.findOneAndUpdate({ _id: id }, {
                                $set: {
                                    task: yourData.task === true ? false : true,
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(data.title, " is todo updated"))];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_5)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ToDoController.prototype.DeleteTodoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.Todo.findByIdAndDelete({ _id: req.params.id })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(data, " is deleted!"))];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ToDoController;
}());
exports.ToDoController = ToDoController;
//# sourceMappingURL=todo.controller.js.map