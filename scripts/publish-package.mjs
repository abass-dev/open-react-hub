import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';

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

    // Increment patch version using semver
    const newVersion = semver.inc(currentVersion, 'patch');
    console.log(`New version: ${newVersion}`);

    // Update package.json with new version
    packageJson.version = newVersion;
    await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });

    // Build the package
    console.log('Building the package...');
    execSync('npm run build', { stdio: 'inherit' });

    // Check if it's a dry run
    const isDryRun = process.argv.includes('--dry-run');

    // Publish to npm
    console.log('Publishing to npm...');
    if (!isDryRun) {
      execSync('npm publish --access public', { stdio: 'inherit' });
    } else {
      console.log('Dry run: skipping npm publish');
    }

    // Commit version bump
    console.log('Committing version bump...');
    execSync('git add package.json', { stdio: 'inherit' });
    execSync(`git commit -m "Bump ${packageName} version to ${newVersion}"`, { stdio: 'inherit' });

    console.log(`Successfully published ${packageName} package version ${newVersion}`);
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