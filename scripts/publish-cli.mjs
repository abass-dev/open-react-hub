import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function publishCli() {
  const cliPath = path.join(__dirname, '..', 'packages', 'cli');

  console.log('Building CLI package...');
  execSync('npm run build', { cwd: cliPath, stdio: 'inherit' });

  console.log('Publishing CLI package to npm...');
  try {
    execSync('npm publish --access public', { cwd: cliPath, stdio: 'inherit' });
    console.log('CLI package published successfully!');
  } catch (error) {
    console.error('Error publishing CLI package:', error.message);
    process.exit(1);
  }
}

publishCli();