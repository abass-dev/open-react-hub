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
import fetch from 'node-fetch';
import { getRegistry } from '../utils/registry';
export function add(componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(chalk.blue('Fetching component information...'));
            const registry = yield getRegistry();
            const componentInfo = findComponentInRegistry(registry, componentPath);
            if (!componentInfo) {
                console.error(chalk.red(`Component "${componentPath}" not found in registry.`));
                return;
            }
            if (componentInfo.npm) {
                yield installFromNpm(componentInfo.name);
            }
            else if (componentInfo.github && componentInfo.file) {
                yield installSingleFileFromGithub(componentInfo.github, componentInfo.file, componentPath);
            }
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
function installSingleFileFromGithub(repoPath, filePath, componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Fetching single file from GitHub...`));
        const [owner, repo] = repoPath.split('/');
        const fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
        try {
            const response = yield fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
            const content = yield response.text();
            const destinationPath = path.join(process.cwd(), 'components', componentPath + '.tsx');
            yield fs.ensureDir(path.dirname(destinationPath));
            yield fs.writeFile(destinationPath, content);
            console.log(chalk.green(`Component file saved to ${destinationPath}`));
        }
        catch (error) {
            console.error(chalk.red('Error fetching file from GitHub:'), error);
            throw error;
        }
    });
}
function installFromGithub(repoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Installing from GitHub...`));
        const [owner, repo, ...componentPath] = repoPath.split('/');
        const fullRepoUrl = `https://github.com/${owner}/${repo}`;
        const componentFullPath = componentPath.join('/');
        const tempDir = path.join(process.cwd(), '.temp-jsrepo');
        yield fs.ensureDir(tempDir);
        try {
            execSync(`git clone --depth 1 --filter=blob:none --sparse ${fullRepoUrl} ${tempDir}`);
            process.chdir(tempDir);
            execSync(`git sparse-checkout set ${componentFullPath}`);
            const sourcePath = path.join(tempDir, componentFullPath);
            const destinationPath = path.join(process.cwd(), 'components', path.basename(componentFullPath));
            yield fs.copy(sourcePath, destinationPath);
        }
        finally {
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
