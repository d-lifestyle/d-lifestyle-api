"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
var types_1 = require("../types");
var notFoundMiddleware = function (_, res) {
    return res.status(types_1.STATUS_CODES.NOT_FOUND).json({
        success: false,
        status_code: types_1.STATUS_CODES.NOT_FOUND,
        message: "Page not found",
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=not-found.middleware.js.map