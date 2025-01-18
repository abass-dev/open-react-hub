"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Check, Copy, Terminal, Hash } from 'lucide-react'
import Prism from 'prismjs'
import { cn } from '@/lib/utils'

// Import Prism themes and plugins
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/command-line/prism-command-line'

// Import language support
export const SUPPORTED_LANGUAGES = [
  'typescript',
  'javascript',
  'jsx',
  'tsx',
  'css',
  'python',
  'java',
  'json',
  'bash',
  'markdown',
  'shell-session'
] as const

// Dynamically import all supported languages
SUPPORTED_LANGUAGES.forEach(lang => {
  require(`prismjs/components/prism-${lang}`)
})

type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

interface LineConfig {
  content: string
  isOutput?: boolean
  isContinuation?: boolean
  customPrompt?: string
}

interface CommandLineConfig {
  user?: string
  host?: string
  path?: string
  basePrompt?: string
  continuationPrompt?: string
  lines?: LineConfig[]
}

interface CodeBlockProps {
  /** The code content to be displayed */
  code: string
  /** Programming language for syntax highlighting */
  language?: SupportedLanguage
  /** Whether to show line numbers */
  showLineNumbers?: boolean
  /** Whether to show the copy button */
  showCopyButton?: boolean
  /** Whether to show the language label */
  showLanguageLabel?: boolean
  /** Color theme for the code block */
  theme?: 'light' | 'dark'
  /** Additional CSS classes */
  className?: string
  /** Whether to render as command-line interface */
  isCommandLine?: boolean
  /** Command-line interface configuration */
  commandLine?: CommandLineConfig
}

const defaultCommandLineConfig: Required<CommandLineConfig> = {
  user: 'user',
  host: 'localhost',
  path: '~',
  basePrompt: '',
  continuationPrompt: '→ ',
  lines: []
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers: initialShowLineNumbers = true,
  showCopyButton = true,
  showLanguageLabel = true,
  theme = 'dark',
  className = '',
  isCommandLine = false,
  commandLine: commandLineProps = {}
}) => {
  // Combine default and provided command line config
  const commandLine = { ...defaultCommandLineConfig, ...commandLineProps }

  // State
  const [isCopied, setIsCopied] = useState(false)
  const [showLineNumbers, setShowLineNumbers] = useState(initialShowLineNumbers)
  const [processedCode, setProcessedCode] = useState('')
  const [processedLines, setProcessedLines] = useState<LineConfig[]>([])

  // Process command line code
  const parseCodeIntoLines = useCallback((codeString: string): LineConfig[] => {
    return codeString.trim().split('\n').map(line => ({
      content: line,
      isOutput: !line.startsWith('$') && !line.startsWith('>'),
      isContinuation: line.startsWith('>')
    }))
  }, [])

  const formatCommandLineCode = useCallback((lines: LineConfig[]): string => {
    return lines.map(line => line.content).join('\n')
  }, [])

  // Process code on mount and when dependencies change
  useEffect(() => {
    if (isCommandLine) {
      const lines = commandLine.lines?.length
        ? commandLine.lines
        : parseCodeIntoLines(code)
      setProcessedLines(lines)
      setProcessedCode(formatCommandLineCode(lines))
    } else {
      setProcessedCode(code)
    }
  }, [code, isCommandLine, commandLine.lines, parseCodeIntoLines, formatCommandLineCode])

  // Highlight code when it changes
  useEffect(() => {
    Prism.highlightAll()
  }, [processedCode, language, isCommandLine])

  // Copy handler
  const handleCopy = async () => {
    try {
      const textToCopy = isCommandLine
        ? processedLines
          .filter(line => !line.isOutput)
          .map(line => line.content.replace(/^\$\s*/, ''))
          .join('\n')
        : code

      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  // Get command line prompt
  const getPrompt = useCallback((line: LineConfig) => {
    if (line.customPrompt) return line.customPrompt
    if (line.isOutput) return ''
    if (line.isContinuation) return commandLine.continuationPrompt

    const { user, host, path, basePrompt } = commandLine
    if (basePrompt) return basePrompt
    return `[${user}@${host} ${path}]$`
  }, [commandLine])

  // Theme-based styles
  const styles = {
    background: theme === 'light' ? 'bg-gray-50' : 'bg-gray-900',
    text: theme === 'light' ? 'text-gray-800' : 'text-gray-100',
    lineNumbers: theme === 'light' ? 'text-gray-400' : 'text-gray-500',
    hover: theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700',
    border: theme === 'light' ? 'border-gray-200' : 'border-gray-700'
  }

  return (
    <div className={cn(
      'rounded-lg overflow-hidden max-w-full',
      styles.background,
      className
    )}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between px-4 py-2 border-b',
        styles.border
      )}>
        <div className="flex items-center gap-2">
          <Terminal size={16} className={styles.text} />
          {showLanguageLabel && (
            <span className={cn('text-sm font-medium', styles.text)}>
              {isCommandLine ? 'Terminal' : language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              styles.hover,
              showLineNumbers ? 'text-blue-500' : styles.text
            )}
            title="Toggle line numbers"
          >
            <Hash size={16} />
          </button>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className={cn('p-1.5 rounded-md transition-colors', styles.hover)}
              title="Copy code"
            >
              {isCopied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className={styles.text} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <div className="relative w-full">
        <div className="overflow-x-auto">
          {isCommandLine ? (
            <pre className={cn(
              'font-mono text-sm p-4 min-w-full',
              theme === 'dark' ? 'prism-dark' : 'prism-light'
            )}>
              {processedLines.map((line, index) => (
                <div
                  key={index}
                  className={cn('flex whitespace-pre', line.isOutput && 'opacity-80')}
                >
                  {showLineNumbers && (
                    <span className={cn(
                      'select-none mr-4 w-8 text-right opacity-60',
                      styles.lineNumbers
                    )}>
                      {index + 1}
                    </span>
                  )}
                  <span className={cn(
                    'select-none mr-4',
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  )}>
                    {getPrompt(line)}
                  </span>
                  <span className={styles.text}>
                    {line.content.replace(/^\$\s*/, '')}
                  </span>
                </div>
              ))}
            </pre>
          ) : (
            <div className="flex min-w-full">
              {showLineNumbers && (
                <div className={cn(
                  'select-none pt-4 pl-4 text-right',
                  styles.lineNumbers,
                  'opacity-60'
                )}>
                  {processedCode.split('\n').map((_, i) => (
                    <div key={i} className="px-2">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
              <pre
                className={cn(
                  'font-mono text-sm p-4 flex-1',
                  theme === 'dark' ? 'prism-dark' : 'prism-light',
                  `language-${language}`
                )}
              >
                <code className={`language-${language}`}>{processedCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeBlock