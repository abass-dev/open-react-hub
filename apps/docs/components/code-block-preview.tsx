"use client"

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { SupportedLanguage } from '@/types/code-block'
import CodeBlock from './code-block'

// Sample code snippets organized by category
const sampleCode = {
    algorithms: {
        javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
console.log(fibonacci(10));`,
        typescript: `function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Sort an array of numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(numbers));`,
        python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`
    },
    dataStructures: {
        typescript: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;

  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}`,
        javascript: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek()); // 20
console.log(stack.pop());  // 20`
    },
    terminal: {
        npm: `$ npm init @open-react-hub/app my-project
Creating a new React application...
$ cd my-project
$ npm install
Installing dependencies...
$ npm run dev
Starting development server...
✨ Ready in 2.4s
➜ Local:   http://localhost:3000`,
        git: `$ git init
Initialized empty Git repository
$ git add .
$ git commit -m "Initial commit"
[main (root-commit)] Initial commit
$ git branch -M main
$ git remote add origin https://github.com/user/repo.git
$ git push -u origin main`,
        docker: `$ docker build -t my-app .
[+] Building 12.5s
$ docker run -p 3000:3000 my-app
➜ Container started successfully
➜ App running at http://localhost:3000`
    }
}

type CodeCategory = keyof typeof sampleCode
type LanguageOptions = {
    [K in CodeCategory]: {
        label: string
        value: keyof typeof sampleCode[K]
    }[]
}

const languageOptions: LanguageOptions = {
    algorithms: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' }
    ],
    dataStructures: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' }
    ],
    terminal: [
        { label: 'NPM Commands', value: 'npm' },
        { label: 'Git Commands', value: 'git' },
        { label: 'Docker Commands', value: 'docker' }
    ]
}

export function CodeBlockPreview() {
    const [category, setCategory] = useState<CodeCategory>('algorithms')
    const [language, setLanguage] = useState<string>(languageOptions[category][0].value)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [showLineNumbers, setShowLineNumbers] = useState(true)
    const [showCopyButton, setShowCopyButton] = useState(true)
    const [showLanguageLabel, setShowLanguageLabel] = useState(true)

    const isTerminal = category === 'terminal'
    const currentCode = sampleCode[category][language as keyof typeof sampleCode[CodeCategory]]

    const handleCategoryChange = (newCategory: CodeCategory) => {
        setCategory(newCategory)
        setLanguage(languageOptions[newCategory][0].value)
    }

    return (
        <div className="space-y-8">
            <Tabs defaultValue="algorithms" value={category} onValueChange={value => handleCategoryChange(value as CodeCategory)}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                    <TabsTrigger value="dataStructures">Data Structures</TabsTrigger>
                    <TabsTrigger value="terminal">Terminal Commands</TabsTrigger>
                </TabsList>
            </Tabs>

            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Language</Label>
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languageOptions[category].map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Theme</Label>
                                <Select value={theme} onValueChange={value => setTheme(value as 'light' | 'dark')}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Show Line Numbers</Label>
                                <Switch
                                    checked={showLineNumbers}
                                    onCheckedChange={setShowLineNumbers}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Show Copy Button</Label>
                                <Switch
                                    checked={showCopyButton}
                                    onCheckedChange={setShowCopyButton}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Show Language Label</Label>
                                <Switch
                                    checked={showLanguageLabel}
                                    onCheckedChange={setShowLanguageLabel}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CodeBlock
                code={currentCode}
                language={isTerminal ? undefined : (language as SupportedLanguage)}
                theme={theme}
                showLineNumbers={showLineNumbers}
                showCopyButton={showCopyButton}
                showLanguageLabel={showLanguageLabel}
                isCommandLine={isTerminal}
                commandLine={isTerminal ? {
                    user: "user",
                    host: "localhost",
                    path: "~"
                } : undefined}
            />
        </div>
    )
}