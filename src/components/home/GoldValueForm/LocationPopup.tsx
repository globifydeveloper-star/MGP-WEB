'use client';

import React, { useState, useEffect } from 'react';
import './LocationPopup.css';

interface LocationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: {
    name: string;
    phone: string;
    purity: string;
    weight: string;
  };
  onSuccess?: () => void;
}

import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getStateCitiesMap, getUniqueStates } from '@/data/branchesData';
import { submitFormSubmission } from '@/lib/strapi';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

export default function LocationPopup({ isOpen, onClose, clientData, onSuccess }: LocationPopupProps) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBranchCode, setSelectedBranchCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{name: string, phone: string, weight: string} | null>(null);

  const { states: bmStates, locationsByState, branchesByState } = useBranchMaster();

  const STATES_LIST = bmStates || [];
  const availableCities = selectedState
    ? locationsByState[selectedState] || []
    : [];

  const availableBranches = selectedState && selectedCity
    ? (branchesByState[selectedState] || []).filter(b => b.location.toLowerCase() === selectedCity.toLowerCase())
    : [];

  // Lock background scroll completely on mobile & desktop when modal is open
  useBodyScrollLock(isOpen);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedState('');
      setSelectedCity('');
      setSelectedBranchCode('');
      setIsSubmitted(false);
      setSubmittedData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset city when state changes
    setSelectedBranchCode('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedCity || !selectedBranchCode) {
      alert('Please select state, city and branch.');
      return;
    }

    setSubmittedData({
      name: clientData.name,
      phone: clientData.phone,
      weight: clientData.weight
    });

    setIsSubmitting(true);
    try {
      await submitFormSubmission({
        name: clientData.name,
        phone: clientData.phone,
        branch: `${selectedCity}, ${selectedState}`,
        branchCode: selectedBranchCode,
        enquiryType: 'Enquire Now',
        sourceForm: `Gold Value Calculator (Purity: ${clientData.purity || 'N/A'}, Weight: ${clientData.weight || '0'}g)`,
        purity: clientData.purity,
        weight: clientData.weight,
        details: {
          purity: clientData.purity,
          weight: clientData.weight,
          state: selectedState,
          city: selectedCity,
          branchCode: selectedBranchCode,
        },
      });
    } catch (err) {
      console.error('Gold value estimate submission error:', err);
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="lp-modal-overlay" onClick={onClose}>
      <div className="lp-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="lp-modal-header">
          <h2 className="lp-modal-title">
            {isSubmitted ? "Estimate Confirmed" : "Select Your Location"}
          </h2>
          <button className="lp-modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Success vs Form Render */}
        {isSubmitted ? (
          <div className="lp-success-view">
            <div className="lp-success-animation">
              <svg className="lp-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="lp-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="lp-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="lp-success-title">Thank You, {submittedData?.name}!</h3>
            <p className="lp-success-message">
              Your valuation request for {submittedData?.weight}g of gold has been received. Our team in {selectedCity}, {selectedState} will contact you at +91 {submittedData?.phone} shortly.
            </p>
            <button type="button" className="lp-success-close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="lp-modal-form" onSubmit={handleSubmit}>
            {/* State Selection */}
            <div className="lp-form-group">
              <div className="lp-select-wrapper">
                <select
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                  className="lp-select"
                >
                  <option value="" disabled>Select State</option>
                  {STATES_LIST.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <span className="lp-select-chevron"></span>
              </div>
            </div>

            {/* City Selection */}
            <div className="lp-form-group">
              <div className="lp-select-wrapper">
                <select
                  required
                  disabled={!selectedState}
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedBranchCode('');
                  }}
                  className="lp-select"
                >
                  <option value="" disabled>Select City</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <span className="lp-select-chevron"></span>
              </div>
            </div>

            {/* Branch Selection */}
            <div className="lp-form-group">
              <div className="lp-select-wrapper">
                <select
                  required
                  disabled={!selectedCity}
                  value={selectedBranchCode}
                  onChange={(e) => setSelectedBranchCode(e.target.value)}
                  className="lp-select"
                >
                  <option value="" disabled>Select Branch</option>
                  {availableBranches.map(b => (
                    <option key={b.branchCode} value={b.branchCode}>{b.branchName}</option>
                  ))}
                </select>
                <span className="lp-select-chevron"></span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="lp-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>
                  SUBMITTING...
                </>
              ) : (
                'SUBMIT ESTIMATE'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
