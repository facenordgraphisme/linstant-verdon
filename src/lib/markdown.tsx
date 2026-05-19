import React from 'react';

export function parseMarkdown(text: string) {
  if (!text) return null;
  
  // Split lines and parse them
  const lines = text.split('\n');
  return (
    <div className="space-y-6">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        
        // Handle empty line
        if (!trimmed) {
          return <div key={index} className="h-4" />;
        }
        
        // H2 Header
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl md:text-3.5xl font-black text-slate-900 mt-14 mb-6 uppercase tracking-tight leading-tight">
              {parseInline(trimmed.slice(3))}
            </h2>
          );
        }
        
        // H1 Header
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl md:text-5xl font-black text-slate-900 mt-16 mb-8 uppercase tracking-tighter leading-none">
              {parseInline(trimmed.slice(2))}
            </h1>
          );
        }
        
        // Unordered List Items
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <li key={index} className="ml-6 list-disc text-slate-600 font-medium leading-relaxed my-3">
              {parseInline(trimmed.slice(2))}
            </li>
          );
        }

        // Default Paragraph
        return (
          <p key={index} className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // Regex to match markdown links [text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, linkText, url] = match;
    const matchIndex = match.index;
    
    // Add plain text before match
    if (matchIndex > lastIndex) {
      result.push(text.slice(lastIndex, matchIndex));
    }
    
    // Add styled React link
    result.push(
      <a 
        key={matchIndex} 
        href={url} 
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-primary hover:text-logo-teal hover:underline font-black transition-all duration-300"
      >
        {linkText}
      </a>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining plain text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  
  return result.length > 0 ? result : [text];
}
