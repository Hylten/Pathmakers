import React, { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { ArrowRight } from 'lucide-react';

const BASE = '/Pathmakers';

const getPosts = () => {
    const postsGlob = import.meta.glob('../../content/insights/*.md', { query: '?raw', eager: true });

    const posts = Object.entries(postsGlob).map(([filepath, content]) => {
        const rawMarkdown = (content as any).default;
        const { data } = matter(rawMarkdown);

        return {
            slug: data.slug || filepath.split('/').pop()?.replace('.md', ''),
            title: data.title || 'Untitled',
            description: data.description || '',
            date: data.date || '',
            author: data.author || 'Pathmaker',
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const InsightsIndex: React.FC = () => {
    const [posts, setPosts] = useState<ReturnType<typeof getPosts>>([]);

    useEffect(() => {
        setPosts(getPosts());

        document.title = 'Insights | Pathmaker';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Strategic insights on Nordic M&A, cross-border transactions, and middle-market advisory from Pathmaker.');
        }
    }, []);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen font-sans">
            <div className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-pathmaker-accent"></div>
                    <span className="text-[10px] tracking-[0.3em] text-pathmaker-body uppercase font-medium">Perspectives</span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl text-pathmaker-text mb-8 tracking-tight">
                    Insights
                </h1>

                <p className="text-sm md:text-base text-pathmaker-body max-w-2xl leading-relaxed tracking-wide">
                    Strategic perspectives on Nordic M&A dynamics, cross-border transaction structuring, and the evolving landscape of middle-market advisory.
                </p>
            </div>

            <div className="space-y-0">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="group border-b border-white/10 hover:border-pathmaker-accent/30 transition-colors duration-500"
                    >
                        <a href={`${BASE}/insights/${post.slug}`} className="block py-10">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                <time className="text-[10px] tracking-widest text-pathmaker-accent uppercase font-medium">
                                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                                <span className="text-[10px] tracking-widest text-pathmaker-body/50 uppercase">
                                    {post.author}
                                </span>
                            </div>

                            <h2 className="font-serif text-2xl md:text-3xl text-pathmaker-text group-hover:text-pathmaker-accent transition-colors duration-300 mb-4 leading-tight">
                                {post.title}
                            </h2>

                            <p className="text-sm text-pathmaker-body leading-relaxed mb-6 line-clamp-3">
                                {post.description}
                            </p>

                            <div className="inline-flex items-center gap-2 text-pathmaker-accent text-xs tracking-[0.15em] uppercase font-medium group-hover:translate-x-2 transition-transform duration-300">
                                Read More
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </a>
                    </article>
                ))}

                {posts.length === 0 && (
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-full text-center py-24 border border-white/5 bg-white/[0.02] rounded-sm">
                            <p className="text-pathmaker-body text-sm tracking-wide">New insights will be published here periodically.</p>
                            <p className="text-pathmaker-body/50 text-xs tracking-wider mt-2">Stay tuned for strategic perspectives.</p>
                        </div>
                        <a
                            href={`${BASE}/`}
                            className="inline-flex items-center gap-2 px-8 py-4 border border-pathmaker-accent/30 hover:bg-pathmaker-accent/10 hover:border-pathmaker-accent text-pathmaker-accent text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 rounded-sm"
                        >
                            Return to Home
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
