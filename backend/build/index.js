"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var server_1 = __importDefault(require("./server"));
server_1.default.listen(3000, function () { return console.log("server started"); });
