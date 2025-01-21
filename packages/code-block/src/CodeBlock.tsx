"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Check, Copy, Terminal, Hash } from "lucide-react";

// Create a wrapper for Prism initialization
const initPrism = async (): Promise<any> => {
    const Prism = (await import("prismjs")).default;
    await Promise.all([
        import("prismjs/components/prism-typescript"),
        import("prismjs/components/prism-javascript"),
        import("prismjs/components/prism-jsx"),
        import("prismjs/components/prism-tsx"),
        import("prismjs/components/prism-css"),
        import("prismjs/components/prism-python"),
        import("prismjs/components/prism-java"),
        import("prismjs/components/prism-json"),
        import("prismjs/components/prism-bash"),
        import("prismjs/components/prism-markdown"),
        import("prismjs/components/prism-shell-session"),
        import("prismjs/plugins/command-line/prism-command-line"),
    ]);

    // Configure bash language after it's loaded
    if (Prism.languages.bash) {
        Prism.languages.bash.command = [
            {
                pattern: /\borh\b/,
                alias: "orh",
            },
            {
                pattern: /\badd\b/,
                alias: "orh-keyword",
            },
            {
                pattern: /\bcreate\b/,
                alias: "orh-keyword",
            },
        ];
    }

    return Prism;
};

// Import styles only on the client side
const ImportStyles: React.FC = () => {
    useEffect(() => {
        const loadStyles = async () => {
            await import("prismjs/themes/prism-tomorrow.css");
            await import("prismjs/plugins/command-line/prism-command-line.css");
        };
        loadStyles();
    }, []);
    return null;
};

// Constants
const COPY_TIMEOUT = 2000;
const DEFAULT_LANGUAGE = "typescript";
const DEFAULT_COMMAND_LINE: Required<CommandLineConfig> = {
    user: "user",
    host: "localhost",
    path: "~",
    basePrompt: "",
    continuationPrompt: "→ ",
    lines: [],
};

// Types
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
    showLineNumbersToggler?: boolean;
    showCopyButton?: boolean;
    showLanguageLabel?: boolean;
    overwriteLanguageLabel?: string;
    theme?: "light" | "dark";
    className?: string;
    isCommandLine?: boolean;
    commandLine?: CommandLineConfig;
}

// Theme configurations
const themeConfig = {
    background: {
        light: "bg-gray-50",
        dark: "bg-gray-900",
    },
    text: {
        light: "text-gray-800",
        dark: "text-gray-100",
    },
    lineNumber: {
        light: "text-gray-400",
        dark: "text-gray-500",
    },
} as const;

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = DEFAULT_LANGUAGE,
    showLineNumbers: initialShowLineNumbers = true,
    showLineNumbersToggler = false,
    showCopyButton = true,
    showLanguageLabel = true,
    overwriteLanguageLabel = "",
    theme = "dark",
    className = "",
    isCommandLine = false,
    commandLine = DEFAULT_COMMAND_LINE,
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [showLineNumbers, setShowLineNumbers] = useState<boolean>(initialShowLineNumbers);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [prismInstance, setPrismInstance] = useState<any>(null);

    // Initialize on client side
    useEffect(() => {
        setIsClient(true);
        const loadPrism = async () => {
            try {
                const Prism = await initPrism();
                setPrismInstance(Prism);
            } catch (error) {
                console.error("Error loading Prism:", error);
            }
        };
        loadPrism();
    }, []);

    // Process code lines
    const { processedCode, processedLines } = useMemo(() => {
        if (!isCommandLine) {
            return { processedCode: code, processedLines: [] };
        }

        const lines = commandLine.lines || code.trim().split("\n").map((line) => ({
            content: line,
            isOutput: !line.startsWith("$") && !line.startsWith(">"),
            isContinuation: line.startsWith(">"),
        }));

        return {
            processedLines: lines,
            processedCode: lines.map((line) => line.content).join("\n"),
        };
    }, [code, isCommandLine, commandLine]);

    // Handle copy functionality
    const handleCopy = useCallback(async () => {
        const textToCopy = isCommandLine
            ? processedLines
                .filter((line) => !line.isOutput)
                .map((line) => line.content.replace(/^\$\s*/, ""))
                .join("\n")
            : code;

        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), COPY_TIMEOUT);
    }, [code, isCommandLine, processedLines]);

    // Handle line numbers toggle
    const toggleLineNumbers = useCallback(() => {
        setShowLineNumbers((prev) => !prev);
    }, []);

    // Get command line prompt
    const getPrompt = useCallback(
        (line: LineConfig): string => {
            if (line.customPrompt) return line.customPrompt;
            if (line.isOutput) return "";
            if (line.isContinuation) return commandLine.continuationPrompt || "→ ";

            const { user, host, path, basePrompt } = commandLine;
            if (basePrompt) return basePrompt;
            return `[${user}@${host} ${path}]$`;
        },
        [commandLine]
    );

    // Syntax highlighting
    useEffect(() => {
        if (prismInstance && typeof window !== "undefined") {
            // Use setTimeout to ensure the DOM is ready
            setTimeout(() => {
                prismInstance.highlightAll();
            }, 0);
        }
    }, [processedCode, language, isCommandLine, prismInstance]);

    // Render header buttons
    const renderHeaderButtons = (): React.ReactNode => (
        <div className="flex items-center gap-2">
            {showLineNumbersToggler && (
                <button
                    onClick={toggleLineNumbers}
                    className={`p-1.5 rounded-md transition-colors
              ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"}
              ${showLineNumbers ? "text-blue-500" : themeConfig.text[theme]}`}
                    title="Toggle line numbers"
                >
                    <Hash size={16} />
                </button>
            )}
            {showCopyButton && (
                <button
                    onClick={handleCopy}
                    className={`p-1.5 rounded-md transition-colors
              ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"}`}
                >
                    {isCopied ? (
                        <Check size={16} className="text-green-500" />
                    ) : (
                        <Copy size={16} className={themeConfig.text[theme]} />
                    )}
                </button>
            )}
        </div>
    );

    // Render command line content
    const renderCommandLine = (): React.ReactNode => (
        <pre className={`font-mono text-sm p-4 ${theme === "dark" ? "prism-dark" : "prism-light"} min-w-0`}>
            {processedLines.map((line, index) => (
                <div key={index} className={`flex min-w-0 ${line.isOutput ? "opacity-80" : ""}`}>
                    {showLineNumbers && (
                        <span
                            className={`flex-none mr-4 min-w-[2rem] text-right ${themeConfig.lineNumber[theme]} opacity-60`}
                        >
                            {index + 1}
                        </span>
                    )}
                    <span className={`flex-none mr-4 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        {getPrompt(line)}
                    </span>
                    <span className={`break-all sm:break-normal ${themeConfig.text[theme]}`}>
                        {line.content.replace(/^\$\s*/, "")}
                    </span>
                </div>
            ))}
        </pre>
    );

    // Render code content
    const renderCode = (): React.ReactNode => (
        <div className="flex min-w-0">
            {showLineNumbers && (
                <div
                    className={`flex-none pt-6 pl-4 ${themeConfig.lineNumber[theme]} opacity-60 text-right min-w-[3rem]`}
                >
                    {processedCode.split("\n").map((_, i) => (
                        <div key={i} className="px-2">
                            {i + 1}
                        </div>
                    ))}
                </div>
            )}
            <pre
                className={`language-${language} font-mono text-sm p-4 overflow-x-auto min-w-0 w-full ${theme === "dark" ? "prism-dark" : "prism-light"
                    }`}
            >
                <code className="break-all sm:break-normal">{processedCode}</code>
            </pre>
        </div>
    );

    // Don't render until client-side and Prism is loaded
    if (!isClient || !prismInstance) {
        return (
            <div className={`rounded-lg ${themeConfig.background[theme]} ${className} w-full min-h-[100px]`}>
                <div className="animate-pulse" />
            </div>
        );
    }

    return (
        <div className="max-w-[100vw] overflow-hidden">
            <ImportStyles />
            <div className={`rounded-lg ${themeConfig.background[theme]} ${className} w-full`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className={themeConfig.text[theme]} />
                        {showLanguageLabel && (
                            <span className={`text-sm font-medium ${themeConfig.text[theme]}`}>
                                {overwriteLanguageLabel !== ""
                                    ? overwriteLanguageLabel
                                    : isCommandLine
                                        ? "Terminal"
                                        : language.charAt(0).toUpperCase() + language.slice(1)}
                            </span>
                        )}
                    </div>
                    {renderHeaderButtons()}
                </div>

                {/* Code Content */}
                <div className="max-w-[100vw] overflow-hidden">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        {isCommandLine ? renderCommandLine() : renderCode()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
