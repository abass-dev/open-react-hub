var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { getRegistry } from '../utils/registry.js';
import { downloadFile } from '../utils/github.js';
export function add(componentPath) {
    return __awaiter(this, void 0, void 0, function () {
        var registry, componentInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (!componentPath.startsWith('github')) return [3 /*break*/, 2];
                    console.log("Check if it's a GitHub path (either full or short syntax): Full ".concat(componentPath));
                    return [4 /*yield*/, handleGithubInstall(componentPath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    console.log(chalk.blue('Fetching component information...'));
                    return [4 /*yield*/, getRegistry()];
                case 3:
                    registry = _a.sent();
                    componentInfo = findComponentInRegistry(registry, componentPath);
                    if (!componentInfo) {
                        console.error(chalk.red("Component \"".concat(componentPath, "\" not found in registry.")));
                        return [2 /*return*/];
                    }
                    if (!componentInfo.npm) return [3 /*break*/, 5];
                    return [4 /*yield*/, installFromNpm(componentInfo.name)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!componentInfo.github) return [3 /*break*/, 7];
                    return [4 /*yield*/, installFromGithub(componentInfo.github, componentPath)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    console.error(chalk.red('No installation source found for this component.'));
                    return [2 /*return*/];
                case 8:
                    console.log(chalk.green("Successfully installed ".concat(componentInfo.name, "!")));
                    if (componentInfo.description) {
                        console.log(chalk.blue('\nDescription:'), componentInfo.description);
                    }
                    if (componentInfo.tags && componentInfo.tags.length > 0) {
                        console.log(chalk.blue('Tags:'), componentInfo.tags.join(', '));
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error(chalk.red('Error installing component:'), error_1.message);
                    }
                    else {
                        console.error(chalk.red('An unknown error occurred while installing the component.'));
                    }
                    process.exit(1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function handleGithubInstall(input) {
    return __awaiter(this, void 0, void 0, function () {
        var owner, repo, componentPath, cleanInput, parts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    owner = 'abass-dev';
                    repo = 'open-react-hub';
                    cleanInput = input.replace(/^github\/?/, '').trim();
                    // Check if it's the full format (owner/repo/path/to/component)
                    if (cleanInput.includes('/')) {
                        parts = cleanInput.split('/');
                        if (parts.length >= 3) {
                            owner = parts[0];
                            repo = parts[1];
                            componentPath = parts.slice(2).join('/');
                        }
                        else {
                            componentPath = cleanInput;
                        }
                    }
                    else {
                        // It's the short format (path/to/component)
                        componentPath = cleanInput;
                    }
                    if (!componentPath) {
                        console.error(chalk.red('Invalid component path. Please specify the path to the component.'));
                        return [2 /*return*/];
                    }
                    console.log(chalk.blue("Installing from GitHub..."));
                    console.log(chalk.blue("Owner: ".concat(owner, ", Repo: ").concat(repo, ", Path: ").concat(componentPath)));
                    // Call the install method with the parsed owner/repo and componentPath
                    return [4 /*yield*/, installFromGithub("".concat(owner, "/").concat(repo), componentPath)];
                case 1:
                    // Call the install method with the parsed owner/repo and componentPath
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function installFromNpm(packageName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(chalk.blue("Installing ".concat(packageName, " from npm...")));
            execSync("npm install ".concat(packageName), { stdio: 'inherit' });
            return [2 /*return*/];
        });
    });
}
function installFromGithub(repoPath, componentPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, owner, repo, githubFilePath, componentsDir, componentDir, fileName, destinationPath, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(chalk.blue("Installing from GitHub..."));
                    _a = repoPath.split('/'), owner = _a[0], repo = _a[1];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    githubFilePath = "components/".concat(componentPath, ".tsx");
                    console.log(chalk.blue("Fetching from: ".concat(githubFilePath)));
                    componentsDir = path.join(process.cwd(), 'components');
                    componentDir = path.join(componentsDir, path.dirname(componentPath));
                    return [4 /*yield*/, fs.ensureDir(componentDir)];
                case 2:
                    _b.sent();
                    fileName = "".concat(path.basename(componentPath), ".tsx");
                    destinationPath = path.join(componentDir, fileName);
                    return [4 /*yield*/, downloadFile({
                            owner: owner,
                            repo: repo,
                            path: githubFilePath,
                            destination: destinationPath
                        })];
                case 3:
                    _b.sent();
                    console.log(chalk.green("\nComponent installed successfully at: ".concat(destinationPath)));
                    console.log(chalk.yellow('\nMake sure to install any necessary dependencies.'));
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        console.error(chalk.red('Error downloading component:'), error_2.message);
                        console.error(chalk.yellow('\nNote: Make sure the component path is correct.'));
                        console.error(chalk.yellow('Examples:'));
                        console.error(chalk.yellow('  npx @open-react-hub/cli add github ui/split-text'));
                        console.error(chalk.yellow('  npx @open-react-hub/cli add github/owner/repo/ui/split-text'));
                    }
                    else {
                        console.error(chalk.red('An unknown error occurred while downloading the component.'));
                    }
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function findComponentInRegistry(registry, componentPath) {
    var parts = componentPath.split('/');
    var current = registry.components;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (!current[part])
            return null;
        current = current[part];
    }
    return current;
}
//# sourceMappingURL=add.js.map