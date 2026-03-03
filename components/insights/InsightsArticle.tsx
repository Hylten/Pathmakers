import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { ArrowLeft } from 'lucide-react';

const BASE = '/Pathmakers';

interface InsightsArticleProps {
    slug: string;
}

export const InsightsArticle: React.FC<InsightsArticleProps> = ({ slug }) => {
    const [content, setContent] = useState('');
    const [meta, setMeta] = useState<any>({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const postsGlob = import.meta.glob('../../content/insights/*.md', { query: '?raw', eager: true });

                let foundPost = null;

                for (const [filepath, fileContent] of Object.entries(postsGlob)) {
                    const rawMarkdown = (fileContent as any).default;
                    const { data, content: markdownBody } = matter(rawMarkdown);

                    const fileSlug = data.slug || filepath.split('/').pop()?.replace('.md', '');

                    if (fileSlug === slug) {
                        foundPost = { meta: data, body: markdownBody };
                        break;
                    }
                }

                if (foundPost) {
                    setContent(foundPost.body);
                    setMeta(foundPost.meta);

                    if (foundPost.meta.title) {
                        document.title = `${foundPost.meta.title} | Pathmaker Insights`;
                    }
                    if (foundPost.meta.description) {
                        const metaDescription = document.querySelector('meta[name="description"]');
                        if (metaDescription) {
                            metaDescription.setAttribute('content', foundPost.meta.description);
                        }
                    }
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error("Failed to load article:", e);
                setError(true);
            }
        };

        loadContent();
        window.scrollTo(0, 0);
    }, [slug]);

    if (error) {
        return (
            <div className="pt-32 pb-24 px-6 text-center min-h-screen flex flex-col items-center justify-center">
                <h1 className="font-serif text-2xl text-pathmaker-text mb-4">Article Not Found</h1>
                <a href={`${BASE}/insights`} className="text-pathmaker-accent uppercase text-xs tracking-[0.2em] font-medium hover:underline">
                    Return to Insights
                </a>
            </div>
        );
    }

    if (!content) {
        return <div className="min-h-screen bg-pathmaker-dark"></div>;
    }

    return (
        <article className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
            <a
                href={`${BASE}/insights`}
                className="inline-flex items-center gap-2 text-pathmaker-body hover:text-pathmaker-accent text-xs tracking-[0.15em] font-medium uppercase mb-16 transition-colors duration-300"
            >
                <ArrowLeft className="w-3 h-3" />
                Back to Insights
            </a>

            <header className="mb-16 border-b border-white/10 pb-12">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
                    <time className="text-[10px] tracking-widest text-pathmaker-accent uppercase font-medium">
                        {meta.date ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </time>
                    <span className="hidden md:inline text-white/20">•</span>
                    <span className="text-[10px] tracking-widest text-pathmaker-body/50 uppercase">
                        {meta.author || 'Pathmaker'}
                    </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pathmaker-text mb-8 leading-tight tracking-tight">
                    {meta.title}
                </h1>

                {meta.description && (
                    <p className="text-base text-pathmaker-body leading-relaxed font-light">
                        {meta.description}
                    </p>
                )}
            </header>

            <div className="prose prose-invert max-w-none prose-p:text-sm prose-p:leading-relaxed prose-p:tracking-wide prose-p:text-pathmaker-body prose-headings:font-serif prose-headings:font-normal prose-headings:text-pathmaker-text prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-xl prose-h3:mt-8 prose-a:text-pathmaker-accent prose-strong:font-medium prose-strong:text-pathmaker-text prose-ol:text-pathmaker-body prose-ul:text-pathmaker-body border-b border-white/10 pb-16">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>

            <footer className="mt-16 text-center">
                <p className="text-[10px] text-pathmaker-body/40 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Pathmaker. All rights reserved.
                </p>
            </footer>
        </article>
    );
};
