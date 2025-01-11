import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { getRegistry } from '../utils/registry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentInfo {
  name: string;
  npm?: string;
  github?: string;
}

export async function add(componentPath: string) {
  try {
    console.log(chalk.blue('Fetching component information...'));
    
    // Get component info from registry
    const registry = await getRegistry();
    const componentInfo = findComponentInRegistry(registry, componentPath);
    
    if (!componentInfo) {
      console.error(chalk.red(`Component "${componentPath}" not found in registry.`));
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
      console.error(chalk.red('No installation source found for this component.'));
      return;
    }

    console.log(chalk.green(`Successfully installed ${componentInfo.name}!`));
  } catch (error) {
    console.error(chalk.red('Error installing component:'), error);
    process.exit(1);
  }
}

async function installFromNpm(packageName: string) {
  console.log(chalk.blue(`Installing ${packageName} from npm...`));
  execSync(`npm install ${packageName}`, { stdio: 'inherit' });
}

async function installFromGithub(repoPath: string) {
  console.log(chalk.blue(`Installing from GitHub...`));
  const [owner, repo, ...componentPath] = repoPath.split('/');
  const fullRepoUrl = `https://github.com/${owner}/${repo}`;
  const componentFullPath = componentPath.join('/');

  // Create a temporary directory
  const tempDir = path.join(process.cwd(), '.temp-jsrepo');
  await fs.ensureDir(tempDir);

  try {
    // Clone the specific directory from the repository
    execSync(`git clone --depth 1 --filter=blob:none --sparse ${fullRepoUrl} ${tempDir}`);
    process.chdir(tempDir);
    execSync(`git sparse-checkout set ${componentFullPath}`);

    // Copy the component to the current project
    const sourcePath = path.join(tempDir, componentFullPath);
    const destinationPath = path.join(process.cwd(), 'components', path.basename(componentFullPath));
    await fs.copy(sourcePath, destinationPath);
  } finally {
    // Clean up
    process.chdir('..');
    await fs.remove(tempDir);
  }
}

function findComponentInRegistry(registry: any, componentPath: string): ComponentInfo | null {
  const parts = componentPath.split('/');
  let current = registry.components;
  
  for (const part of parts) {
    if (!current[part]) return null;
    current = current[part];
  }
  
  return current;
}