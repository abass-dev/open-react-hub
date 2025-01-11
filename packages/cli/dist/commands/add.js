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
import { fileURLToPath } from 'url';
import { getRegistry } from '../utils/registry.js';
import pkg from 'inquirer';
const { prompt } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
        try {
            execSync(`npm install ${packageName}`, { stdio: 'inherit' });
        }
        catch (error) {
            if (error) {
                console.log(chalk.yellow('Detected a potential conflict with React versions.'));
                const { action } = yield prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'How would you like to proceed?',
                        choices: [
                            { name: 'Use --force', value: 'force' },
                            { name: 'Use --legacy-peer-deps', value: 'legacy' },
                            { name: 'Cancel installation', value: 'cancel' }
                        ]
                    }
                ]);
                if (action === 'force') {
                    execSync(`npm install ${packageName} --force`, { stdio: 'inherit' });
                }
                else if (action === 'legacy') {
                    execSync(`npm install ${packageName} --legacy-peer-deps`, { stdio: 'inherit' });
                }
                else {
                    console.log(chalk.yellow('Installation cancelled.'));
                    return;
                }
            }
            else {
                throw error;
            }
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
