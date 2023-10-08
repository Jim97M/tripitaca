"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiUrl = 'http://localhost:3000/api/v1/user/signin';
const payload = { email: 'admin@mail.com', password: 'admin123' };
const requestsCount = 110;
const delayMilliseconds = 2000;
async function sendRequest() {
    try {
        const response = await axios_1.default.post(apiUrl, payload);
        console.log(response.status, response.data);
    }
    catch (error) {
        console.error('Error:', error.response.status, error.response.data);
    }
}
async function sendRequestsSequentially() {
    for (let i = 0; i < requestsCount; i++) {
        await sendRequest();
        if (i < requestsCount - 1) {
            await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
        }
    }
}
sendRequestsSequentially();
//# sourceMappingURL=test-rate-limiter.js.map