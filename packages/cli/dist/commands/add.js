"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const registry_1 = require("../utils/registry");
async function add(componentPath) {
    try {
        console.log(chalk_1.default.blue('Fetching component information...'));
        // Get component info from registry
        const registry = await (0, registry_1.getRegistry)();
        const componentInfo = findComponentInRegistry(registry, componentPath);
        if (!componentInfo) {
            console.error(chalk_1.default.red(`Component "${componentPath}" not found in registry.`));
            return;
        }
        // If npm package exists, prefer that
        if (componentInfo.npm) {
            await installFromNpm(componentInfo.name);
        }
        // Fallback to GitHub if available
        else if (componentInfo.github) {
            await installFromGithub(componentInfo.github);
        }
        else {
            console.error(chalk_1.default.red('No installation source found for this component.'));
            return;
        }
        console.log(chalk_1.default.green(`Successfully installed ${componentInfo.name}!`));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error installing component:'), error);
        process.exit(1);
    }
}
exports.add = add;
async function installFromNpm(packageName) {
    console.log(chalk_1.default.blue(`Installing ${packageName} from npm...`));
    (0, child_process_1.execSync)(`npm install ${packageName}`, { stdio: 'inherit' });
}
async function installFromGithub(repoPath) {
    console.log(chalk_1.default.blue(`Installing from GitHub...`));
    const [owner, repo, ...componentPath] = repoPath.split('/');
    const fullRepoUrl = `https://github.com/${owner}/${repo}`;
    const componentFullPath = componentPath.join('/');
    // Create a temporary directory
    const tempDir = path_1.default.join(process.cwd(), '.temp-jsrepo');
    await fs_extra_1.default.ensureDir(tempDir);
    try {
        // Clone the specific directory from the repository
        (0, child_process_1.execSync)(`git clone --depth 1 --filter=blob:none --sparse ${fullRepoUrl} ${tempDir}`);
        process.chdir(tempDir);
        (0, child_process_1.execSync)(`git sparse-checkout set ${componentFullPath}`);
        // Copy the component to the current project
        const sourcePath = path_1.default.join(tempDir, componentFullPath);
        const destinationPath = path_1.default.join(process.cwd(), 'components', path_1.default.basename(componentFullPath));
        await fs_extra_1.default.copy(sourcePath, destinationPath);
    }
    finally {
        // Clean up
        process.chdir('..');
        await fs_extra_1.default.remove(tempDir);
    }
}
function findComponentInRegistry(registry, componentPath) {
    const parts = componentPath.split('/');
    let current = registry.components;
    for (const part of parts) {
        if (!current[part])
            return null;
        current = current[part];
    }
    return current;
}
