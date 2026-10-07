'use client';

import React, { useEffect } from 'react';
import './ApplicationSuccessModal.css';

interface ApplicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantName?: string;
  positionTitle?: string;
}

export default function ApplicationSuccessModal({
  isOpen,
  onClose,
  applicantName,
  positionTitle,
}: ApplicationSuccessModalProps) {
  // Close on Escape key press and prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="app-success-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="app-success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="app-success-close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="app-success-icon-wrap">
          <div className="app-success-icon-pulse"></div>
          <div className="app-success-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <h3 className="app-success-title">Application Submitted!</h3>
        
        <p className="app-success-subtitle">
          Thank you {applicantName ? <span className="app-success-highlight">{applicantName}</span> : 'for applying'}! Your job application has been successfully received.
        </p>

        {positionTitle && (
          <div className="app-success-role-badge">
            <span className="app-success-role-label">Applied Role:</span>
            <span className="app-success-role-value">{positionTitle}</span>
          </div>
        )}

        <p className="app-success-desc">
          Our HR and recruitment team is reviewing your profile and resume. If shortlisted, we will get in touch with you directly via email or phone.
        </p>

        <button type="button" className="app-success-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
