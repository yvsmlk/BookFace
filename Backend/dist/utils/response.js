"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResponse = void 0;
const checkResponse = (response, res) => {
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return false;
    }
    return true;
};
exports.checkResponse = checkResponse;
