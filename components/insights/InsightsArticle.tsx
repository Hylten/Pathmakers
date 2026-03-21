import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';

// Browser-safe frontmatter parser
function parseFrontmatter(raw: string) {
    const lines = raw.split(/\r?\n/);
    if (!lines[0] || lines[0].trim() !== '---') return { data: {} as Record<string, string>, content: raw };

    const data: Record<string, string> = {};
    let i = 1;
    while (i < lines.length && !lines[i].trim().startsWith('---')) {
        const line = lines[i];
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let value = line.slice(colonIdx + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            data[key] = value;
        }
        i++;
    }

    const closingLine = lines[i] || '';
    const remainder = closingLine.trim().slice(3).trim();
    
    let content = lines.slice(i + 1).join('\n');
    if (remainder) {
        content = remainder + '\n' + content;
    }
    
    return { data, content };
}

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
                    const { data, content: markdownBody } = parseFrontmatter(rawMarkdown);

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

    if (!content && !error) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-pathmaker-accent border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] tracking-[0.3em] text-pathmaker-body uppercase font-medium">Decrypting Insight...</p>
                </div>
            </div>
        );
    }

    return (
        <article className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
            <a
                href="/Pathmakers/insights/"
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

            <div className="article-content" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem', fontWeight: 300, fontFamily: "'Inter', sans-serif" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>

            <style>{`
                .article-content { line-height: 2.4; -webkit-font-smoothing: antialiased; }
                .article-content p { margin-bottom: 4.5rem; }
                .article-content h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; margin-top: 6rem; margin-bottom: 3rem; color: #fff; line-height: 1.2; font-weight: 300; }
                .article-content h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin-top: 4.5rem; margin-bottom: 2.5rem; color: #fff; font-weight: 400; }
                .article-content ul, .article-content ol { margin-bottom: 3.5rem; padding-left: 2rem; }
                .article-content li { margin-bottom: 1.5rem; }
                .article-content hr { border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 6rem 0; }
                .article-content strong { color: #fff; font-weight: 500; }
                .article-content a { color: #E2AD33; text-decoration: underline; text-underline-offset: 4px; }
                .article-content blockquote { border-left: 1px solid #E2AD33; padding-left: 1.5rem; margin: 4.5rem 0; font-style: italic; color: rgba(255, 255, 255, 0.5); }
            `}</style>

            <div className="mt-20 flex flex-col items-center gap-6">
                <a
                    href="https://wa.me/46701619978?text=Regarding%20Pathmaker%20Insights:"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#1ebe5d] transition-all duration-300"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contact via WhatsApp
                </a>
                <a
                    href="/Pathmakers/"
                    className="text-pathmaker-accent text-[10px] uppercase tracking-[0.2em] font-medium hover:underline"
                >
                    ← Back to Home
                </a>
            </div>
            <footer className="mt-16 text-center">
                <p className="text-[10px] text-pathmaker-body/40 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Pathmaker. All rights reserved.
                </p>
            </footer>
        </article>
    );
};
