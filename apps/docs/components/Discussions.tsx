'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Filter, Github } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type CategoryName =
    | 'Announcements'
    | 'General'
    | 'Help Wanted'
    | 'Ideas'
    | 'Polls'
    | 'Q&A'
    | 'Show and tell';

const CATEGORY_DESCRIPTIONS: Record<CategoryName, string> = {
    'Announcements': 'Important updates and news about Open React Hub',
    'General': 'General discussions about anything related to the project',
    'Help Wanted': 'Request assistance or offer help to other community members',
    'Ideas': 'Share and discuss new ideas for the project',
    'Polls': 'Community polls and voting on various topics',
    'Q&A': 'Ask questions and get answers from the community',
    'Show and tell': 'Share your projects and achievements'
};

const CATEGORY_IDS: Record<CategoryName, string> = {
    'Announcements': 'DIC_kwDONo1Zgc4CmNer',
    'General': 'DIC_kwDONo1Zgc4CmNes',
    'Help Wanted': 'DIC_kwDONo1Zgc4CmNgR',
    'Ideas': 'DIC_kwDONo1Zgc4CmNeu',
    'Polls': 'DIC_kwDONo1Zgc4CmNew',
    'Q&A': 'DIC_kwDONo1Zgc4CmNet',
    'Show and tell': 'DIC_kwDONo1Zgc4CmNev'
};

const SCRIPT_ATTRIBUTES = {
    src: 'https://giscus.app/client.js',
    'data-repo': 'abass-dev/open-react-hub',
    'data-repo-id': 'R_kgDONo1ZgQ',
    'data-mapping': 'pathname',
    'data-strict': '0',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'en',
} as const;

export default function Discussions() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryName>('General');

    const createGiscusScript = (category: CategoryName) => {
        const script = document.createElement('script');

        Object.entries(SCRIPT_ATTRIBUTES).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });

        script.setAttribute('data-category', category);
        script.setAttribute('data-category-id', CATEGORY_IDS[category]);
        script.crossOrigin = 'anonymous';
        script.async = true;

        return script;
    };

    useEffect(() => {
        const script = createGiscusScript('General');
        const container = document.getElementById('discussions-container');

        if (container) {
            container.appendChild(script);
            setIsLoaded(true);
        }

        return () => {
            script.remove();
        };
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value as CategoryName;
        setCurrentCategory(category);

        const container = document.getElementById('discussions-container');
        if (!container) return;

        container.innerHTML = '';

        const script = container.previousElementSibling;
        if (script?.tagName === 'SCRIPT') {
            script.remove();
        }

        const newScript = createGiscusScript(category);
        container.appendChild(newScript);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <MessageCircle className="w-8 h-8" />
                    <h1 className="text-4xl font-bold">Community Discussions</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join our community discussions to share ideas, ask questions, and connect with other developers.
                    All discussions are powered by GitHub Discussions.
                </p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <Filter className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">
                                Filter by Category
                            </label>
                            <select
                                className="w-full md:w-64 p-2 rounded-md border border-input bg-background 
                                         text-foreground shadow-sm ring-offset-background
                                         focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onChange={handleCategoryChange}
                                value={currentCategory}
                            >
                                {(Object.keys(CATEGORY_IDS) as CategoryName[]).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {CATEGORY_DESCRIPTIONS[currentCategory]}
                            </p>
                        </div>
                    </div>

                    {!isLoaded && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading discussions...</p>
                        </div>
                    )}

                    <div id="discussions-container" className="mt-4" />
                </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground mt-8">
                <div className="flex items-center justify-center gap-2">
                    <Github className="w-4 h-4" />
                    <p>
                        View all discussions on{' '}
                        <a
                            href="https://github.com/abass-dev/open-react-hub/discussions"
                            className="text-primary hover:underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub Discussions
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}