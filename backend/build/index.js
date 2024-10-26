"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var stripe_1 = __importDefault(require("stripe"));
console.log(process.env.STRIPE_KEY);
var stripe = new stripe_1.default((_a = process.env.STRIPE_KEY) !== null && _a !== void 0 ? _a : "");
console.log('hello');
