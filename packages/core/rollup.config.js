import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

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
      typescript(),
      copy({
        targets: [
          { src: 'src/styles.css', dest: 'dist' }
        ]
      })
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

