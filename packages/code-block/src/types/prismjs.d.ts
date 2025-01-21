// src/types/prismjs.d.ts
import 'prismjs';

declare module 'prismjs' {
    // Extend the Grammar interface to add a custom "command" property
    export interface Grammar {
        command?: {
            pattern: RegExp;
            alias: string;
        }[];
    }
}
