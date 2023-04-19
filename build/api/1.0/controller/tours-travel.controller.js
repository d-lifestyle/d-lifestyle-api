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
exports.ToursTravelController = void 0;
var utils_1 = require("utils");
var model_1 = require("model");
var ToursTravelController = /** @class */ (function () {
    function ToursTravelController() {
        this.routes = [];
        this.routes.push({
            handler: this.getAllToursTravel,
            method: "GET",
            path: "/tours-travel",
        });
        this.routes.push({
            handler: this.GetToursTravelById,
            method: "GET",
            path: "/tours-travel/:id",
        });
        this.routes.push({
            handler: this.UpdateToursTravelById,
            method: "PUT",
            path: "/tours-travel/:id",
        });
        this.routes.push({
            handler: this.AddNewToursTravel,
            method: "POST",
            path: "/tours-travel",
        });
        this.routes.push({
            handler: this.DeleteToursTravelById,
            method: "DELETE",
            path: "/tours-travel/:id",
        });
    }
    ToursTravelController.prototype.getAllToursTravel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.ToursTravel.find().populate({
                                path: "SubCategory",
                                select: "name",
                                populate: { path: "CategoryId", select: "name" },
                            })];
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
    ToursTravelController.prototype.GetToursTravelById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.ToursTravel.findById({ _id: req.params.id }).populate({
                                path: "SubCategory",
                                select: "name",
                                populate: { path: "CategoryId", select: "name" },
                            })];
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
    ToursTravelController.prototype.AddNewToursTravel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, displayName, duration, place, theme, SubCategory, newToursTravel, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, code = _a.code, displayName = _a.displayName, duration = _a.duration, place = _a.place, theme = _a.theme, SubCategory = _a.SubCategory;
                        return [4 /*yield*/, new model_1.ToursTravel({
                                code: code,
                                displayName: displayName,
                                duration: duration,
                                place: place,
                                theme: theme,
                                SubCategory: SubCategory,
                            }).save()];
                    case 1:
                        newToursTravel = _b.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(newToursTravel.displayName, " is created!"))];
                    case 2:
                        err_3 = _b.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToursTravelController.prototype.UpdateToursTravelById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var UpdateToursTravel, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.ToursTravel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })];
                    case 1:
                        UpdateToursTravel = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(UpdateToursTravel.displayName, " is updated!"))];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ToursTravelController.prototype.DeleteToursTravelById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.ToursTravel.findByIdAndDelete({ _id: req.params.id })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, utils_1.Ok)(res, "".concat(data.displayName, " is deleted!"))];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, (0, utils_1.UnAuthorized)(res, err_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ToursTravelController;
}());
exports.ToursTravelController = ToursTravelController;
//# sourceMappingURL=tours-travel.controller.js.map