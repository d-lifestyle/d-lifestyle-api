"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtToken = exports.Forbidden = exports.UnAuthorized = exports.NotFound = exports.BadRequest = exports.NoContent = exports.Created = exports.Ok = exports.ERROR_MESSAGE = exports.ApiError = exports.AuthError = exports.normalizePort = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var types_1 = require("../types");
var normalizePort = function (val) {
    var normolizedPort = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(normolizedPort)) {
        return val;
    }
    if (normolizedPort >= 0) {
        return normolizedPort;
    }
    return false;
};
exports.normalizePort = normalizePort;
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "AuthError";
        return _this;
    }
    return AuthError;
}(Error));
exports.AuthError = AuthError;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ApiError";
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var ERROR_MESSAGE;
(function (ERROR_MESSAGE) {
    ERROR_MESSAGE["INVALID_JWT_TOKEN"] = "Invalid jwt token";
})(ERROR_MESSAGE = exports.ERROR_MESSAGE || (exports.ERROR_MESSAGE = {}));
var Ok = function (res, data) {
    res.status(types_1.STATUS_CODES.OK).json({
        success: true,
        data: data,
        status_code: types_1.RESPONSE_MESSAGE.OK,
    });
};
exports.Ok = Ok;
var Created = function (res, data) {
    res.status(types_1.STATUS_CODES.CREATED).json({
        success: true,
        data: data,
        status_code: types_1.RESPONSE_MESSAGE.CREATED,
    });
};
exports.Created = Created;
var NoContent = function (res) {
    res.status(types_1.STATUS_CODES.NO_CONTENT).json({
        success: true,
        status_code: types_1.STATUS_CODES.NO_CONTENT,
    });
};
exports.NoContent = NoContent;
var BadRequest = function (res, message) {
    res.status(types_1.STATUS_CODES.BAD_REQUEST).json({
        success: false,
        status_code: types_1.STATUS_CODES.BAD_REQUEST,
        message: message,
    });
};
exports.BadRequest = BadRequest;
var NotFound = function (res, message) {
    res.status(types_1.STATUS_CODES.NOT_FOUND).json({
        success: false,
        status_code: types_1.STATUS_CODES.NOT_FOUND,
        message: message,
    });
};
exports.NotFound = NotFound;
var UnAuthorized = function (res, message) {
    res.status(types_1.STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        status_code: types_1.STATUS_CODES.UNAUTHORIZED,
        message: message,
    });
};
exports.UnAuthorized = UnAuthorized;
var Forbidden = function (res, message) {
    res.status(types_1.STATUS_CODES.FORBIDDEN).json({
        success: false,
        status_code: types_1.STATUS_CODES.FORBIDDEN,
        message: message,
    });
};
exports.Forbidden = Forbidden;
var getJwtToken = function (body) {
    var _a;
    return jsonwebtoken_1.default.sign(body, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : config_1.default.get("JWT_SECRET"), {
        expiresIn: config_1.default.get("JWT_EXPIRE"),
    });
};
exports.getJwtToken = getJwtToken;
//# sourceMappingURL=server.utils.js.map