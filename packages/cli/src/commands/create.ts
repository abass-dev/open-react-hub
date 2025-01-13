// src/commands/create.ts
import { Command } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs-extra';

export const createCommand = new Command('create')
  .description('Create a new OpenReactHub project')
  .argument('<project-name>', 'Name of the project')
  .action(async (projectName: string) => {
    console.log(`Creating a new OpenReactHub project: ${projectName}`);

    // Create project directory
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Initialize Next.js project
    execSync('npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"', { stdio: 'inherit' });

    // Install OpenReactHub core
    execSync('npm install @open-react-hub/core tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

    // Update tailwind.config.js
    const tailwindConfig = `
const { openReactHubPreset } = require('@open-react-hub/core/dist/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@open-react-hub/**/*.js',
  ],
  presets: [openReactHubPreset],
}
`;
    fs.writeFileSync('tailwind.config.js', tailwindConfig);

    // Update globals.css
    const globalCss = `
@import '@open-react-hub/core/dist/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    fs.writeFileSync('src/app/globals.css', globalCss);

    // Create example component
    const exampleComponent = `
import { Button } from '@open-react-hub/core';

export default function MyComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
      <Button variant="primary">Click me!</Button>
    </div>
  );
}
`;
    fs.writeFileSync('src/components/MyComponent.tsx', exampleComponent);

    // Update page.tsx
    const pageContent = `
import MyComponent from '../components/MyComponent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyComponent />
    </main>
  );
}
`;
    fs.writeFileSync('src/app/page.tsx', pageContent);

    console.log('OpenReactHub project created successfully!');
    console.log('To get started, run the following commands:');
    console.log(`  cd ${projectName}`);
    console.log('  npm run dev');
  });
