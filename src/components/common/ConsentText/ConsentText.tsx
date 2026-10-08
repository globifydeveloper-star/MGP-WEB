'use client';

import React, { useState } from 'react';
import './ConsentText.css';

interface ConsentTextProps {
  initialExpanded?: boolean;
}

const CONSENT_SHORT = 'I authorize Muthoot Exim Pvt. Ltd. and other Muthoot Pappachan Group companies (including their agents/representatives) to contact me';
const CONSENT_REST = ' via telephone, mobile, SMS, WhatsApp, or email regarding their products, services, and promotions, and to share my details with associated third-party agencies for marketing purposes.';

export default function ConsentText({ initialExpanded = false }: ConsentTextProps) {
  const [expanded, setExpanded] = useState(initialExpanded);

  return (
    <span className="consent-text-root">
      {CONSENT_SHORT}
      {!expanded ? (
        <>
          ...{' '}
          <button
            type="button"
            className="consent-more-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(true);
            }}
            aria-label="Show more authorization details"
          >
            more
          </button>
        </>
      ) : (
        <>
          {CONSENT_REST}{' '}
          <button
            type="button"
            className="consent-more-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(false);
            }}
            aria-label="Show less authorization details"
          >
            less
          </button>
        </>
      )}
    </span>
  );
}
