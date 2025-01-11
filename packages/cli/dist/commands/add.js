var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { getRegistry } from '../utils/registry.js';
export function add(componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(chalk.blue('Fetching component information...'));
            // Get component info from registry
            const registry = yield getRegistry();
            const componentInfo = findComponentInRegistry(registry, componentPath);
            if (!componentInfo) {
                console.error(chalk.red(`Component "${componentPath}" not found in registry.`));
                return;
            }
            // If npm package exists, prefer that
            if (componentInfo.npm) {
                yield installFromNpm(componentInfo.name);
            }
            // Fallback to GitHub if available
            else if (componentInfo.github) {
                yield installFromGithub(componentInfo.github);
            }
            else {
                console.error(chalk.red('No installation source found for this component.'));
                return;
            }
            console.log(chalk.green(`Successfully installed ${componentInfo.name}!`));
        }
        catch (error) {
            console.error(chalk.red('Error installing component:'), error);
            process.exit(1);
        }
    });
}
function installFromNpm(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Installing ${packageName} from npm...`));
        execSync(`npm install ${packageName}`, { stdio: 'inherit' });
    });
}
function installFromGithub(repoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Installing from GitHub...`));
        const [owner, repo, ...componentPath] = repoPath.split('/');
        const fullRepoUrl = `https://github.com/${owner}/${repo}`;
        const componentFullPath = componentPath.join('/');
        // Create a temporary directory
        const tempDir = path.join(process.cwd(), '.temp-jsrepo');
        yield fs.ensureDir(tempDir);
        try {
            // Clone the specific directory from the repository
            execSync(`git clone --depth 1 --filter=blob:none --sparse ${fullRepoUrl} ${tempDir}`);
            process.chdir(tempDir);
            execSync(`git sparse-checkout set ${componentFullPath}`);
            // Copy the component to the current project
            const sourcePath = path.join(tempDir, componentFullPath);
            const destinationPath = path.join(process.cwd(), 'components', path.basename(componentFullPath));
            yield fs.copy(sourcePath, destinationPath);
        }
        finally {
            // Clean up
            process.chdir('..');
            yield fs.remove(tempDir);
        }
    });
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
