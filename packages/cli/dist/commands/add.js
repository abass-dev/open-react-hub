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
import { downloadFile } from '../utils/github.js';
export function add(componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if it's a GitHub path (either full or short syntax)
            if (componentPath.startsWith('github')) {
                console.log(`Check if it's a GitHub path (either full or short syntax): Full ${componentPath}`);
                yield handleGithubInstall(componentPath);
                return;
            }
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
                yield installFromGithub(componentInfo.github, componentPath);
            }
            else {
                console.error(chalk.red('No installation source found for this component.'));
                return;
            }
            console.log(chalk.green(`Successfully installed ${componentInfo.name}!`));
            if (componentInfo.description) {
                console.log(chalk.blue('\nDescription:'), componentInfo.description);
            }
            if (componentInfo.tags && componentInfo.tags.length > 0) {
                console.log(chalk.blue('Tags:'), componentInfo.tags.join(', '));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red('Error installing component:'), error.message);
            }
            else {
                console.error(chalk.red('An unknown error occurred while installing the component.'));
            }
            process.exit(1);
        }
    });
}
function handleGithubInstall(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let owner = 'abass-dev'; // Default values for owner and repo
        let repo = 'open-react-hub';
        let componentPath;
        // Remove 'github' prefix and trim
        const cleanInput = input.replace(/^github\/?/, '').trim();
        // Check if it's the full format (owner/repo/path/to/component)
        if (cleanInput.includes('/')) {
            const parts = cleanInput.split('/');
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
            return;
        }
        console.log(chalk.blue(`Installing from GitHub...`));
        console.log(chalk.blue(`Owner: ${owner}, Repo: ${repo}, Path: ${componentPath}`));
        // Call the install method with the parsed owner/repo and componentPath
        yield installFromGithub(`${owner}/${repo}`, componentPath);
    });
}
function installFromNpm(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Installing ${packageName} from npm...`));
        execSync(`npm install ${packageName}`, { stdio: 'inherit' });
    });
}
function installFromGithub(repoPath, componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue(`Installing from GitHub...`));
        const [owner, repo] = repoPath.split('/');
        try {
            // Construct the GitHub file path
            const githubFilePath = `components/${componentPath}.tsx`;
            console.log(chalk.blue(`Fetching from: ${githubFilePath}`));
            // Create components directory structure in user's project
            const componentsDir = path.join(process.cwd(), 'components');
            const componentDir = path.join(componentsDir, path.dirname(componentPath));
            yield fs.ensureDir(componentDir);
            // Download the file
            const fileName = `${path.basename(componentPath)}.tsx`;
            const destinationPath = path.join(componentDir, fileName);
            yield downloadFile({
                owner,
                repo,
                path: githubFilePath,
                destination: destinationPath
            });
            console.log(chalk.green(`\nComponent installed successfully at: ${destinationPath}`));
            console.log(chalk.yellow('\nMake sure to install any necessary dependencies.'));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red('Error downloading component:'), error.message);
                console.error(chalk.yellow('\nNote: Make sure the component path is correct.'));
                console.error(chalk.yellow('Examples:'));
                console.error(chalk.yellow('  npx @open-react-hub/cli add github ui/split-text'));
                console.error(chalk.yellow('  npx @open-react-hub/cli add github/owner/repo/ui/split-text'));
            }
            else {
                console.error(chalk.red('An unknown error occurred while downloading the component.'));
            }
            throw error;
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
