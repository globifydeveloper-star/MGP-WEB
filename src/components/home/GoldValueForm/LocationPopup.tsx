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

const STATIC_STATE_CITIES = getStateCitiesMap();
const STATIC_STATES_LIST = getUniqueStates();

export default function LocationPopup({ isOpen, onClose, clientData, onSuccess }: LocationPopupProps) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { states: bmStates, locationsByState } = useBranchMaster();

  const STATES_LIST = bmStates && bmStates.length > 0 ? bmStates : STATIC_STATES_LIST;
  const availableCities = selectedState
    ? (locationsByState[selectedState] && locationsByState[selectedState].length > 0
        ? locationsByState[selectedState]
        : STATIC_STATE_CITIES[selectedState] || [])
    : [];

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedState('');
      setSelectedCity('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset city when state changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) {
      alert('Please select both state and city.');
      return;
    }

    try {
      await submitFormSubmission({
        name: clientData.name,
        phone: clientData.phone,
        branch: `${selectedCity}, ${selectedState}`,
        enquiryType: 'Enquire Now',
        sourceForm: `Gold Value Calculator (Purity: ${clientData.purity || 'N/A'}, Weight: ${clientData.weight || '0'}g)`,
        purity: clientData.purity,
        weight: clientData.weight,
        details: {
          purity: clientData.purity,
          weight: clientData.weight,
          state: selectedState,
          city: selectedCity,
        },
      });
    } catch (err) {
      console.error('Gold value estimate submission error:', err);
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
            <h3 className="lp-success-title">Thank You, {clientData.name}!</h3>
            <p className="lp-success-message">
              Your valuation request for {clientData.weight}g of gold has been received. Our team in {selectedCity}, {selectedState} will contact you at +91 {clientData.phone} shortly.
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
                  onChange={(e) => setSelectedCity(e.target.value)}
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

            {/* Submit Button */}
            <button type="submit" className="lp-submit-btn">
              SUBMIT ESTIMATE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
