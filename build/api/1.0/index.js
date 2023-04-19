"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutesV1 = void 0;
var controller_1 = require("./controller");
var routesHandler = function (express, controller) {
    for (var _i = 0, _a = controller.routes; _i < _a.length; _i++) {
        var route = _a[_i];
        var middleware = route.middleware || [];
        switch (route.method) {
            case "GET":
                express.get.apply(express, __spreadArray(__spreadArray(["/api/1.0".concat(route.path)], middleware, false), [route.handler], false));
                break;
            case "POST":
                express.post.apply(express, __spreadArray(__spreadArray(["/api/1.0".concat(route.path)], middleware, false), [route.handler], false));
                break;
            case "PUT":
                express.put.apply(express, __spreadArray(__spreadArray(["/api/1.0".concat(route.path)], middleware, false), [route.handler], false));
                break;
            case "DELETE":
                express.delete.apply(express, __spreadArray(__spreadArray(["/api/1.0".concat(route.path)], middleware, false), [route.handler], false));
                break;
            default:
                break;
        }
    }
};
var registerRoutesV1 = function (express) {
    routesHandler(express, new controller_1.HomePageController());
    routesHandler(express, new controller_1.ToDoController());
    routesHandler(express, new controller_1.CategoriesController());
    routesHandler(express, new controller_1.CarouselController());
    routesHandler(express, new controller_1.SubCategoryController());
    routesHandler(express, new controller_1.AccommodationController());
    routesHandler(express, new controller_1.ToursTravelController());
    routesHandler(express, new controller_1.MainCategoriesController());
};
exports.registerRoutesV1 = registerRoutesV1;
//# sourceMappingURL=index.js.map