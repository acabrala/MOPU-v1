"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(error, message, data) {
        this.error = error;
        this.message = message;
        this.data = data;
    }
}
exports.Response = Response;
