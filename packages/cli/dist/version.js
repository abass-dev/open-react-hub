import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
export function getVersion() {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = dirname(__filename);
    var packageJsonPath = join(__dirname, '..', 'package.json');
    var packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
    var version = JSON.parse(packageJsonContent).version;
    return version;
}
//# sourceMappingURL=version.js.map