import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { getRegistry } from '../utils/registry';
import { downloadFile } from '../utils/github';

interface ComponentInfo {
  name: string;
  npm?: string;
  github?: string;
  file?: string;
  description?: string;
  version?: string;
  author?: string;
  tags?: string[];
}

export async function add(componentPath: string) {
  try {
    // Check if it's a GitHub path
    if (componentPath.startsWith('github/')) {
      await handleGithubInstall(componentPath);
      return;
    }

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
    else if (componentInfo.github && componentInfo.file) {
      await installFromGithub(componentInfo.github, componentInfo.file, componentPath);
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('Error installing component:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred while installing the component.'));
    }
    process.exit(1);
  }
}

async function handleGithubInstall(input: string) {
  // Format: github/owner/repo/path/to/component
  const parts = input.split('/');
  if (parts.length < 4) {
    console.error(chalk.red('Invalid GitHub path. Format: github/owner/repo/path/to/component'));
    return;
  }

  const [_, owner, repo, ...pathParts] = parts;
  const filePath = pathParts.join('/');
  await installFromGithub(`github/${owner}/${repo}`, filePath, filePath);
}

async function installFromNpm(packageName: string) {
  console.log(chalk.blue(`Installing ${packageName} from npm...`));
  execSync(`npm install ${packageName}`, { stdio: 'inherit' });
}

async function installFromGithub(repoPath: string, filePath: string, componentPath: string) {
  console.log(chalk.blue(`Installing from GitHub...`));
  const [_, owner, repo] = repoPath.split('/');

  try {
    // Create components directory structure
    const componentsDir = path.join(process.cwd(), 'components');
    const componentDir = path.join(componentsDir, path.dirname(componentPath));
    await fs.ensureDir(componentDir);

    // Download the file
    const fileName = path.basename(filePath);
    const destinationPath = path.join(componentDir, fileName);
    
    await downloadFile({
      owner,
      repo,
      path: filePath,
      destination: destinationPath
    });

    console.log(chalk.green(`\nComponent installed successfully at: ${destinationPath}`));
    console.log(chalk.yellow('\nMake sure to install any necessary dependencies.'));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('Error downloading component:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred while downloading the component.'));
    }
    throw error;
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

