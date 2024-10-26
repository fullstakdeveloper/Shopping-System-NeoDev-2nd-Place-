"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default((_a = process.env.STRIPE_KEY) !== null && _a !== void 0 ? _a : "");
exports.default = stripe;
