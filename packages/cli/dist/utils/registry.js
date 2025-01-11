var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
const REGISTRY_URL = 'https://raw.githubusercontent.com/abass-dev/open-react-hub/main/registry.json';
export function getRegistry() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(REGISTRY_URL);
            return yield response.json();
        }
        catch (error) {
            throw new Error('Failed to fetch component registry');
        }
    });
}
