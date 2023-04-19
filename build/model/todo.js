"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var TodoSchema = new mongoose_1.default.Schema({
    title: { type: mongoose_1.default.Schema.Types.String, required: true },
    task: { type: mongoose_1.default.Schema.Types.Boolean, required: true },
}, {
    timestamps: true,
});
exports.Todo = mongoose_1.default.model("Todo", TodoSchema);
//# sourceMappingURL=todo.js.map