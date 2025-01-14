import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal, Hash } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/plugins/command-line/prism-command-line';
// Language imports
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-shell-session';

export interface LineConfig {
    content: string;
    isOutput?: boolean;
    isContinuation?: boolean;
    customPrompt?: string;
}

export interface CommandLineConfig {
    user?: string;
    host?: string;
    path?: string;
    basePrompt?: string;
    continuationPrompt?: string;
    lines?: LineConfig[];
}

export interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    showLanguageLabel?: boolean;
    theme?: 'light' | 'dark';
    className?: string;
    isCommandLine?: boolean;
    commandLine?: CommandLineConfig;
}

export const CodeBlock = ({
    code,
    language = 'typescript',
    showLineNumbers: initialShowLineNumbers = true,
    showCopyButton = true,
    showLanguageLabel = true,
    theme = 'dark',
    className = '',
    isCommandLine = false,
    commandLine = {
        user: 'user',
        host: 'localhost',
        path: '~',
        basePrompt: '',
        continuationPrompt: '→ ',
    },
}: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [processedCode, setProcessedCode] = useState('');
    const [processedLines, setProcessedLines] = useState<LineConfig[]>([]);
    const [showLineNumbers, setShowLineNumbers] = useState(initialShowLineNumbers);

    useEffect(() => {
        if (isCommandLine) {
            const lines = commandLine.lines || parseCodeIntoLines(code);
            setProcessedLines(lines);
            setProcessedCode(formatCommandLineCode(lines));
        } else {
            setProcessedCode(code);
        }
    }, [code, isCommandLine, commandLine]);

    const parseCodeIntoLines = (code: string): LineConfig[] => {
        return code.trim().split('\n').map(line => ({
            content: line,
            isOutput: !line.startsWith('$') && !line.startsWith('>'),
            isContinuation: line.startsWith('>')
        }));
    };

    const formatCommandLineCode = (lines: LineConfig[]): string => {
        return lines.map(line => line.content).join('\n');
    };

    const handleCopy = async () => {
        const textToCopy = isCommandLine
            ? processedLines
                .filter(line => !line.isOutput)
                .map(line => line.content.replace(/^\$\s*/, ''))
                .join('\n')
            : code;

        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const toggleLineNumbers = () => {
        setShowLineNumbers(!showLineNumbers);
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [processedCode, language, isCommandLine]);

    const getPrompt = (line: LineConfig, index: number) => {
        if (line.customPrompt) return line.customPrompt;
        if (line.isOutput) return '';
        if (line.isContinuation) return commandLine.continuationPrompt || '→ ';

        const { user, host, path, basePrompt } = commandLine;
        if (basePrompt) return basePrompt;
        return `[${user}@${host} ${path}]$`;
    };

    const backgroundColors = {
        light: 'bg-gray-50',
        dark: 'bg-gray-900',
    };

    const textColors = {
        light: 'text-gray-800',
        dark: 'text-gray-100',
    };

    const lineNumberColors = {
        light: 'text-gray-400',
        dark: 'text-gray-500',
    };

    return (
        <div className={`rounded-lg overflow-hidden ${backgroundColors[theme]} ${className} max-w-full`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <Terminal size={16} className={textColors[theme]} />
                    {showLanguageLabel && (
                        <span className={`text-sm font-medium ${textColors[theme]}`}>
                            {isCommandLine ? 'Terminal' : language.charAt(0).toUpperCase() + language.slice(1)}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLineNumbers}
                        className={`p-1.5 rounded-md transition-colors
              ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'}
              ${showLineNumbers ? 'text-blue-500' : textColors[theme]}`}
                        title="Toggle line numbers"
                    >
                        <Hash size={16} />
                    </button>
                    {showCopyButton && (
                        <button
                            onClick={handleCopy}
                            className={`p-1.5 rounded-md transition-colors
                ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'}`}
                        >
                            {isCopied ? (
                                <Check size={16} className="text-green-500" />
                            ) : (
                                <Copy size={16} className={textColors[theme]} />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Code Content */}
            <div className="relative w-full">
                <div className="overflow-x-auto">
                    {isCommandLine ? (
                        <pre className={`font-mono text-sm p-4 min-w-full ${theme === 'dark' ? 'prism-dark' : 'prism-light'}`}>
                            {processedLines.map((line, index) => (
                                <div
                                    key={index}
                                    className={`flex ${line.isOutput ? 'opacity-80' : ''} whitespace-pre`}
                                >
                                    {showLineNumbers && (
                                        <span className={`select-none mr-4 w-8 text-right ${lineNumberColors[theme]} opacity-60`}>
                                            {index + 1}
                                        </span>
                                    )}
                                    <span className={`select-none mr-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {getPrompt(line, index)}
                                    </span>
                                    <span className={textColors[theme]}>
                                        {line.content.replace(/^\$\s*/, '')}
                                    </span>
                                </div>
                            ))}
                        </pre>
                    ) : (
                        <div className="flex min-w-full">
                            {showLineNumbers && (
                                <div className={`select-none pt-4 pl-4 ${lineNumberColors[theme]} opacity-60 text-right`}>
                                    {processedCode.split('\n').map((_, i) => (
                                        <div key={i} className="px-2">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <pre className={`language-${language} font-mono text-sm p-4 flex-1 ${theme === 'dark' ? 'prism-dark' : 'prism-light'}`}>
                                <code>{processedCode}</code>
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;