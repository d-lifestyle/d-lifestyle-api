"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var SubCategorySchema = new mongoose_1.default.Schema({
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    CategoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
}, {
    timestamps: true,
});
exports.SubCategory = mongoose_1.default.model("SubCategory", SubCategorySchema);
//# sourceMappingURL=sub-category.js.map