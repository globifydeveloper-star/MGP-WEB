'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleTranslateProps {
  nonce?: string;
}

/**
 * Mounts the hidden Google Translate widget once at the app root and patches
 * React DOM mutations caused by Google Translate's <font> text wrappers so
 * Next.js client-side navigation does not throw NotFoundError.
 */
export default function GoogleTranslate({ nonce }: GoogleTranslateProps) {
  useEffect(() => {
    // Guard against Google Translate wrapping text nodes in <font> tags,
    // which otherwise causes React 19 removeChild/insertBefore crashes on route changes.
    if (typeof Node === 'function' && Node.prototype) {
      const proto = Node.prototype as Node & { __mgpTranslatePatched?: boolean };
      if (!proto.__mgpTranslatePatched) {
        const originalRemoveChild = Node.prototype.removeChild;
        Node.prototype.removeChild = function <T extends Node>(child: T): T {
          if (child.parentNode !== this) {
            return child;
          }
          return originalRemoveChild.call(this, child) as T;
        };

        const originalInsertBefore = Node.prototype.insertBefore;
        Node.prototype.insertBefore = function <T extends Node>(
          newNode: T,
          referenceNode: Node | null
        ): T {
          if (referenceNode && referenceNode.parentNode !== this) {
            return originalInsertBefore.call(this, newNode, null) as T;
          }
          return originalInsertBefore.call(this, newNode, referenceNode) as T;
        };

        proto.__mgpTranslatePatched = true;
      }
    }
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        className="notranslate"
        translate="no"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <Script
        id="google-translate-bootstrap"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (window.__mgpTranslateInitLoaded) return;
              window.__mgpTranslateInitLoaded = true;
              window.googleTranslateElementInit = function() {
                if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                  new window.google.translate.TranslateElement(
                    {
                      pageLanguage: 'en',
                      autoDisplay: false
                    },
                    'google_translate_element'
                  );
                }
              };
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
              ${nonce ? `s.nonce = '${nonce}';` : ''}
              document.head.appendChild(s);
            })();
          `,
        }}
      />
    </>
  );
}
