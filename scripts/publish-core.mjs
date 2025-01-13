import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function publishCli() {
  const cliPath = path.join(__dirname, '..', 'packages', 'core');
  console.log('Building Core components for OpenReactHub package...');
  execSync('npm run build', { cwd: cliPath, stdio: 'inherit' });

  console.log('Publishing Core components for OpenReactHub package to npm...');
  try {
    execSync('npm publish --access public', { cwd: cliPath, stdio: 'inherit' });
    console.log('Core components for OpenReactHub package published successfully!');
  } catch (error) {
    console.error('Error publishing Core components for OpenReactHub package:', error.message);
    process.exit(1);
  }
}

publishCli();