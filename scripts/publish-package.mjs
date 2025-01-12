import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

async function publishPackage(packageName) {
  const packagePath = path.join(process.cwd(), 'packages', packageName);

  try {
    console.log(`Starting ${packageName} package publication process...`);

    // Change to package directory
    process.chdir(packagePath);

    // Read current version
    let packageJson;
    try {
      const packageJsonContent = await fs.readFile('package.json', 'utf-8');
      packageJson = JSON.parse(packageJsonContent);
    } catch (error) {
      console.error('Error reading or parsing package.json:', error);
      process.exit(1);
    }

    const currentVersion = packageJson.version;
    console.log(`Current version: ${currentVersion}`);

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });

    // Build the package
    console.log('Building the package...');
    execSync('npm run build', { stdio: 'inherit' });

    // Publish to npm
    console.log('Publishing to npm...');
    execSync('npm publish --access public', { stdio: 'inherit' });

    console.log(`Successfully published ${packageName} package version ${currentVersion}`);
  } catch (error) {
    console.error(`Error publishing ${packageName} package:`, error);
    process.exit(1);
  }
}

// Get the package name from command line arguments
const packageName = process.argv[2];

if (!packageName) {
  console.error('Please provide a package name');
  process.exit(1);
}

publishPackage(packageName);

