import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import { getRegistry } from '../utils/registry';

interface ComponentInfo {
  name: string;
  npm?: string;
  github?: string;
  file?: string;
}

export async function add(componentPath: string) {
  try {
    console.log(chalk.blue('Fetching component information...'));
    
    const registry = await getRegistry();
    const componentInfo = findComponentInRegistry(registry, componentPath);
    
    if (!componentInfo) {
      console.error(chalk.red(`Component "${componentPath}" not found in registry.`));
      return;
    }

    if (componentInfo.npm) {
      await installFromNpm(componentInfo.name);
    } else if (componentInfo.github && componentInfo.file) {
      await installSingleFileFromGithub(componentInfo.github, componentInfo.file, componentPath);
    } else if (componentInfo.github) {
      await installFromGithub(componentInfo.github);
    } else {
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

async function installSingleFileFromGithub(repoPath: string, filePath: string, componentPath: string) {
  console.log(chalk.blue(`Fetching single file from GitHub...`));
  const [owner, repo] = repoPath.split('/');
  const fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const content = await response.text();

    const destinationPath = path.join(process.cwd(), 'components', componentPath + '.tsx');
    await fs.ensureDir(path.dirname(destinationPath));
    await fs.writeFile(destinationPath, content);

    console.log(chalk.green(`Component file saved to ${destinationPath}`));
  } catch (error) {
    console.error(chalk.red('Error fetching file from GitHub:'), error);
    throw error;
  }
}

async function installFromGithub(repoPath: string) {
  console.log(chalk.blue(`Installing from GitHub...`));
  const [owner, repo, ...componentPath] = repoPath.split('/');
  const fullRepoUrl = `https://github.com/${owner}/${repo}`;
  const componentFullPath = componentPath.join('/');

  const tempDir = path.join(process.cwd(), '.temp-jsrepo');
  await fs.ensureDir(tempDir);

  try {
    execSync(`git clone --depth 1 --filter=blob:none --sparse ${fullRepoUrl} ${tempDir}`);
    process.chdir(tempDir);
    execSync(`git sparse-checkout set ${componentFullPath}`);

    const sourcePath = path.join(tempDir, componentFullPath);
    const destinationPath = path.join(process.cwd(), 'components', path.basename(componentFullPath));
    await fs.copy(sourcePath, destinationPath);
  } finally {
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

