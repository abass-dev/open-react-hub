import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
    ],
    external: ['react', 'react-dom', 'tailwindcss', 'tailwindcss/colors'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;

