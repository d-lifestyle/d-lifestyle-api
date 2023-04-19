"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var server_1 = __importDefault(require("../server"));
var utils_1 = require("../utils");
var port = (0, utils_1.normalizePort)(process.env.PORT || 8080);
server_1.default.set("port", port);
var server = http_1.default.createServer(server_1.default);
var onError = function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error("".concat(bind, " requires elevated privileges"));
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error("".concat(bind, " is already in use"));
            process.exit(1);
            break;
        default:
            throw error;
    }
};
var onListening = function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe ".concat(addr) : "port ".concat(addr.port);
    console.info("Listening on ".concat(bind));
};
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
//# sourceMappingURL=www.js.map