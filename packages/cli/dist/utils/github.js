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
import fs from 'fs-extra';
export function downloadFile({ owner, repo, path, destination }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
        try {
            console.log(`Downloading from: ${url}`);
            const response = yield fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }
            const content = yield response.text();
            yield fs.writeFile(destination, content, 'utf8');
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error downloading file from GitHub: ${error.message}`);
            }
            else {
                throw new Error('An unknown error occurred while downloading the component.');
            }
        }
    });
}
