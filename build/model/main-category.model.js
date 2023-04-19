"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategory = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var MainCategorySchema = new mongoose_1.default.Schema({
    displayName: { type: mongoose_1.default.Schema.Types.String, required: true },
    CategoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
}, {
    timestamps: true,
});
exports.MainCategory = mongoose_1.default.model("MainCategory", MainCategorySchema);
//# sourceMappingURL=main-category.model.js.map