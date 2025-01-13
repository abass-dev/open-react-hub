import { readFileSync } from 'fs';
import { join } from 'path';

export function getVersion(): string {
  const packageJsonPath = join(__dirname, '..', 'package.json');
  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
  const { version } = JSON.parse(packageJsonContent);
  return version;
}

