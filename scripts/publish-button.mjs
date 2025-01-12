import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const buttonPackagePath = path.join(process.cwd(), 'packages', 'button');

async function publishButton() {
  try {
    console.log('Starting button package publication process...');

    // Change to button package directory
    process.chdir(buttonPackagePath);

    // Read current version
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'));
    const currentVersion = packageJson.version;

    console.log(`Current version: ${currentVersion}`);

    // Increment patch version
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    const newVersion = `${major}.${minor}.${patch + 1}`;

    console.log(`New version: ${newVersion}`);

    // Update package.json with new version
    packageJson.version = newVersion;
    await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Run tests
    console.log('Running tests...');
    execSync('npm test', { stdio: 'inherit' });

    // Build the package
    console.log('Building the package...');
    execSync('npm run build', { stdio: 'inherit' });

    // Publish to npm
    console.log('Publishing to npm...');
    execSync('npm publish --access public', { stdio: 'inherit' });

    // Commit version bump
    console.log('Committing version bump...');
    execSync('git add package.json', { stdio: 'inherit' });
    execSync(`git commit -m "Bump button version to ${newVersion}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    console.log(`Successfully published button package version ${newVersion}`);
  } catch (error) {
    console.error('Error publishing button package:', error);
    process.exit(1);
  }
}

publishButton();

