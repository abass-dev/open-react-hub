import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export function getVersion(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const packageJsonPath = join(__dirname, '..', 'package.json');
  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
  const { version } = JSON.parse(packageJsonContent);
  return version;
}

