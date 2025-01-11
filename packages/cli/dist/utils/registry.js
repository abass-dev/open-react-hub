"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const REGISTRY_URL = 'https://raw.githubusercontent.com/abass-dev/open-react-hub/main/registry.json';
async function getRegistry() {
    try {
        const response = await (0, node_fetch_1.default)(REGISTRY_URL);
        return await response.json();
    }
    catch (error) {
        throw new Error('Failed to fetch component registry');
    }
}
exports.getRegistry = getRegistry;
