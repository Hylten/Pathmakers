import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';

// Browser-safe frontmatter parser
function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
    if (!match) return { data: {} as Record<string, string>, content: raw };

    const frontmatter = match[1];
    const content = match[2];
    const data: Record<string, string> = {};

    // Standard YAML-style key parsing (handles multiline)
    const lines = frontmatter.split(/\n/);
    lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let value = line.slice(colonIdx + 1).trim();
            // Only set if not set yet, or if this looks like a cleaner line-based set
            if (key && !data[key]) {
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                data[key] = value;
            }
        }
    });

    // Fallback / Enhanced parsing for single-line or mashed keys
    // This regex matches keys that might contain hyphens/underscores and values that are quoted OR unquoted
    const pairs = frontmatter.match(/([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^ \n,]+))/g);
    if (pairs) {
        pairs.forEach(pair => {
            const cIdx = pair.indexOf(':');
            const k = pair.slice(0, cIdx).trim();
            let v = pair.slice(cIdx + 1).trim();
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
                v = v.slice(1, -1);
            }
            // If the line-based parser caught a "leaking" line (multiple keys on one line), 
            // the regex-based one here will provide much cleaner values.
            // So we prioritize regex matches for common keys.
            if (k) data[k] = v;
        });
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
        <article className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto min-h-screen" style={{ animation: 'fadeIn 0.9s ease-out forwards', opacity: 0 }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0px); }
                }
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 0px rgba(37, 211, 102, 0.4); }
                    50% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.6); }
                    100% { box-shadow: 0 0 0px rgba(37, 211, 102, 0.4); }
                }
                .article-content { 
                    line-height: 2.1; 
                    -webkit-font-smoothing: antialiased; 
                    font-family: 'Inter', sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                }
                .article-content p { margin-bottom: 2.5rem; font-size: 1.125rem; }
                .article-content h2 { 
                    font-family: 'Cormorant Garamond', serif; 
                    font-size: 2.8rem; 
                    margin-top: 5rem; 
                    margin-bottom: 2.5rem; 
                    color: #fff; 
                    line-height: 1.2; 
                    font-weight: 300; 
                    letter-spacing: -0.02em;
                }
                .article-content h3 { 
                    font-family: 'Cormorant Garamond', serif; 
                    font-size: 2rem; 
                    margin-top: 4rem; 
                    margin-bottom: 2rem; 
                    color: #fff; 
                    font-weight: 400; 
                }
                .article-content ul, .article-content ol { margin-bottom: 3rem; padding-left: 1.5rem; }
                .article-content li { margin-bottom: 1.2rem; }
                .article-content hr { border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 5rem 0; }
                .article-content strong { color: #fff; font-weight: 600; }
                .article-content a { color: #E2AD33; text-decoration: underline; text-underline-offset: 4px; }
            `}</style>
            
            <a
                href="/Pathmaker/insights/"
                className="inline-flex items-center gap-2 text-pathmaker-body hover:text-pathmaker-accent text-xs tracking-[0.15em] font-medium uppercase mb-16 transition-colors duration-300"
            >
                <ArrowLeft className="w-3 h-3" />
                Back to Insights
            </a>

            <header className="mb-20 border-b border-white/10 pb-16">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
                    <time className="text-[10px] tracking-widest text-pathmaker-accent uppercase font-medium">
                        {meta.date ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </time>
                    <span className="hidden md:inline text-white/20">•</span>
                    <span className="text-[10px] tracking-widest text-pathmaker-body/50 uppercase">
                        {meta.author || 'The Pathmaker'}
                    </span>
                </div>

                <h1 className="font-serif text-5xl md:text-6xl text-pathmaker-text mb-10 leading-tight tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {meta.title}
                </h1>

                {meta.description && (
                    <p className="text-lg text-pathmaker-body/80 leading-relaxed font-light italic border-l-2 border-pathmaker-accent/30 pl-6 py-2">
                        {meta.description}
                    </p>
                )}
            </header>

            <div className="article-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>

            <div className="mt-24 flex flex-col items-center gap-8">
                <a
                    href="https://wa.me/46701619978?text=Hello%20Pathmaker,%20I%20have%20questions%20regarding%20your%20latest%20insight..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-10 py-5 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.25em] font-bold rounded-full hover:bg-[#1ebe5d] transition-all duration-300 transform hover:scale-105"
                    style={{ animation: 'pulseGlow 2.5s infinite' }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contact The Principal
                </a>
                <a
                    href="/Pathmaker/"
                    className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium hover:text-pathmaker-accent transition-colors duration-300"
                >
                    Return to Navigation
                </a>
            </div>
            
            <footer className="mt-24 text-center">
                <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase">
                    &copy; {new Date().getFullYear()} Pathmaker — Institutional Intelligence
                </p>
            </footer>
        </article>
    );
};
