import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface CmsParagraphsProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

// Renders a CMS text field as paragraphs: a blank line starts a new paragraph,
// and inline HTML (e.g. <a href="...">) is allowed after sanitising.
export default function CmsParagraphs({ text, className, style }: CmsParagraphsProps) {
  const paragraphs = text.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, idx) => (
        <p
          key={idx}
          className={className}
          style={style}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p, { ADD_ATTR: ['target'] }) }}
        />
      ))}
    </>
  );
}
