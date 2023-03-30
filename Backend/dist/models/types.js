"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagTypes = exports.StatusTypes = void 0;
// 100 - 199 general message
// 200 - 399 db error
// 400+ other
exports.StatusTypes = {
    100: 'Success',
    200: 'Already exist',
    201: 'Input does not exist',
    202: 'Request fail',
    400: 'Input missing',
    401: 'Incorrect input',
    402: 'Incorrect input type',
    403: 'Not authorized',
    404: 'System error',
    405: 'Already connected',
    406: 'Missing Token'
};
exports.TagTypes = {
    USER: 'USER',
    GROUP: 'GROUP',
    EVENT: 'EVENT'
};
