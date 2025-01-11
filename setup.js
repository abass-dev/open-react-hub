const fs = require('fs-extra');
const path = require('path');

// Create base directory structure
const directories = [
  'packages/cli',
  'packages/registry',
  'components',
  'scripts'
];

async function setup() {
  // Create directories
  for (const dir of directories) {
    await fs.ensureDir(dir);
    console.log(`Created directory: ${dir}`);
  }

  // Create root package.json
  const rootPackage = {
    "name": "open-react-hub",
    "version": "1.0.0",
    "private": true,
    "workspaces": [
      "packages/*"
    ],
    "scripts": {
      "build": "turbo run build",
      "dev": "turbo run dev",
      "lint": "turbo run lint",
      "publish-registry": "node scripts/publish-registry.js"
    },
    "devDependencies": {
      "turbo": "^1.10.0",
      "fs-extra": "^11.1.0"
    }
  };

  await fs.writeJSON('package.json', rootPackage, { spaces: 2 });
  console.log('Created root package.json');

  // Create registry.json
  const registry = {
    "components": {
      "text-animations": {
        "split-text": {
          "name": "@open-react-hub/split-text",
          "description": "Animate text by splitting it into characters",
          "version": "1.0.1",
          "npm": "https://www.npmjs.com/package/@open-react-hub/split-text",
          "github": "github/abass-dev/open-react-hub-split-text",
          "author": "abass-dev",
          "tags": ["animation", "text", "react-spring"]
        }
      }
    }
  };

  await fs.writeJSON('registry.json', registry, { spaces: 2 });
  console.log('Created registry.json');

  // Create README.md
  const readme = `# OpenReactHub

A collection of React components and utilities for building modern web applications.

## Components

Browse our components in the [registry.json](./registry.json) file.

## Installation

You can install components using our CLI:

\`\`\`bash
# Install globally
npm install -g @open-react-hub/cli

# Or use directly with npx
npx @open-react-hub/cli add text-animations/split-text

# Or install from GitHub
npx jsrepo add github/abass-dev/open-react-hub/text-animations/split-text
\`\`\`

## Documentation

Visit our documentation at [docs.openreacthub.dev](https://docs.openreacthub.dev)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT
`;

  await fs.writeFile('README.md', readme);
  console.log('Created README.md');

  // Create CLI package
  const cliPackage = {
    "name": "@open-react-hub/cli",
    "version": "1.0.0",
    "description": "CLI for OpenReactHub components",
    "main": "dist/index.js",
    "bin": {
      "orh": "./dist/index.js"
    },
    "scripts": {
      "build": "tsc",
      "dev": "tsc -w",
      "test": "jest"
    },
    "dependencies": {
      "commander": "^9.4.1",
      "fs-extra": "^11.1.0",
      "chalk": "^5.2.0",
      "node-fetch": "^3.3.0"
    },
    "devDependencies": {
      "@types/node": "^18.11.18",
      "@types/fs-extra": "^11.0.1",
      "typescript": "^4.9.4",
      "jest": "^29.3.1"
    }
  };

  await fs.writeJSON('packages/cli/package.json', cliPackage, { spaces: 2 });
  console.log('Created CLI package.json');

  // Create CLI tsconfig.json
  const tsconfig = {
    "compilerOptions": {
      "target": "ES2020",
      "module": "CommonJS",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.test.ts"]
  };

  await fs.writeJSON('packages/cli/tsconfig.json', tsconfig, { spaces: 2 });
  console.log('Created CLI tsconfig.json');

  // Create CLI source files
  await fs.ensureDir('packages/cli/src/commands');
  await fs.ensureDir('packages/cli/src/utils');

  // Create main CLI file
  const cliMain = `#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add';

const program = new Command();

program
  .version('1.0.0')
  .description('OpenReactHub CLI - Manage React components and utilities');

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(add);

program.parse(process.argv);
`;

  await fs.writeFile('packages/cli/src/index.ts', cliMain);
  console.log('Created CLI main file');

  // Create add command
  const addCommand = `import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { getRegistry } from '../utils/registry';

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
      console.error(chalk.red(\`Component "\${componentPath}" not found in registry.\`));
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

    console.log(chalk.green(\`Successfully installed \${componentInfo.name}!\`));
  } catch (error) {
    console.error(chalk.red('Error installing component:'), error);
    process.exit(1);
  }
}

async function installFromNpm(packageName: string) {
  console.log(chalk.blue(\`Installing \${packageName} from npm...\`));
  execSync(\`npm install \${packageName}\`, { stdio: 'inherit' });
}

async function installFromGithub(repoPath: string) {
  console.log(chalk.blue(\`Installing from GitHub...\`));
  const [owner, repo, ...componentPath] = repoPath.split('/');
  const fullRepoUrl = \`https://github.com/\${owner}/\${repo}\`;
  const componentFullPath = componentPath.join('/');

  // Create a temporary directory
  const tempDir = path.join(process.cwd(), '.temp-jsrepo');
  await fs.ensureDir(tempDir);

  try {
    // Clone the specific directory from the repository
    execSync(\`git clone --depth 1 --filter=blob:none --sparse \${fullRepoUrl} \${tempDir}\`);
    process.chdir(tempDir);
    execSync(\`git sparse-checkout set \${componentFullPath}\`);

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
}`;

  await fs.writeFile('packages/cli/src/commands/add.ts', addCommand);
  console.log('Created add command');

  // Create registry utility
  const registryUtil = `import fetch from 'node-fetch';

const REGISTRY_URL = 'https://raw.githubusercontent.com/abass-dev/open-react-hub/main/registry.json';

export async function getRegistry() {
  try {
    const response = await fetch(REGISTRY_URL);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch component registry');
  }
}`;

  await fs.writeFile('packages/cli/src/utils/registry.ts', registryUtil);
  console.log('Created registry utility');

  // Create registry update script
  const registryScript = `const fs = require('fs-extra');
const path = require('path');

async function updateRegistry() {
  try {
    const registry = await fs.readJSON('registry.json');
    
    // Validate registry format
    if (!registry.components) {
      throw new Error('Invalid registry format');
    }

    // You can add additional validation or modification here

    // Write back the updated registry
    await fs.writeJSON('registry.json', registry, { spaces: 2 });
    console.log('Registry updated successfully');
  } catch (error) {
    console.error('Error updating registry:', error);
    process.exit(1);
  }
}

updateRegistry();`;

  await fs.writeFile('scripts/publish-registry.js', registryScript);
  console.log('Created registry update script');

  console.log('\nSetup complete! Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: cd packages/cli && npm install && npm run build');
  console.log('3. Run: npm run publish-registry');
}

setup().catch(console.error);