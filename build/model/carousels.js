"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var CarouselSchema = new mongoose_1.default.Schema({
    dataImage: { type: mongoose_1.default.Schema.Types.String, required: true },
    dataAlt: { type: mongoose_1.default.Schema.Types.String, required: true },
}, {
    timestamps: true,
});
exports.Carousel = mongoose_1.default.model("Carousel", CarouselSchema);
//# sourceMappingURL=carousels.js.map