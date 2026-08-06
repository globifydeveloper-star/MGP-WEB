'use client';

import React, { useState, useEffect } from 'react';
import { getJobPositions, JobPosition } from '@/lib/strapi';
import './applyform.css';

interface ApplyFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    position: string;
    message: string;
    resumeName: string;
  };
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ApplyForm({
  formData,
  onChangeInput,
  onChangeFile,
  onSubmit,
  isSubmitting,
  submitSuccess,
  fileInputRef
}: ApplyFormProps) {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);

  useEffect(() => {
    async function loadPositions() {
      try {
        const positions = await getJobPositions();
        setJobPositions(positions);
      } catch (err) {
        console.error('Failed to load job positions for apply form:', err);
      }
    }
    loadPositions();
  }, []);

  return (
    <section className="career-form-section">
      <div className="container">
        <div id="apply-form" className="career-form-container">
          <h2 className="career-form-title">Apply Now</h2>
          <p className="career-form-subtitle">Fill in the details below and upload your resume. We will get back to you shortly.</p>
          
          {submitSuccess && (
            <div className="career-form-success">
              Your application has been submitted successfully! Thank you for your interest in Muthoot Gold Point.
            </div>
          )}

          <form onSubmit={onSubmit} className="career-form">
            <div className="career-form-grid">
              <div className="career-form-group">
                <label htmlFor="name" className="career-form-label">
                  Full Name <span className="career-form-required">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={onChangeInput}
                  placeholder="e.g. John Doe"
                  className="career-form-input" 
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="email" className="career-form-label">
                  Email Address <span className="career-form-required">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={onChangeInput}
                  placeholder="e.g. john@example.com"
                  className="career-form-input" 
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="phone" className="career-form-label">
                  Phone Number <span className="career-form-required">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={onChangeInput}
                  placeholder="e.g. +91 98765 43210"
                  className="career-form-input" 
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="position" className="career-form-label">
                  Desired Position <span className="career-form-required">*</span>
                </label>
                <select 
                  id="position" 
                  name="position" 
                  required 
                  value={formData.position}
                  onChange={onChangeInput}
                  className="career-form-select"
                >
                  <option value="" disabled>Select a position</option>
                  <option value="General Application / Resume Submission">General Application / Other</option>
                  {jobPositions.map(job => (
                    <option key={job.documentId ?? job.id} value={job.title}>{job.title}</option>
                  ))}
                </select>
              </div>

              <div className="career-form-group career-form-group-full">
                <label htmlFor="message" className="career-form-label">
                  Cover Note / Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={onChangeInput}
                  placeholder="Tell us why you are a good fit for this role..."
                  className="career-form-textarea" 
                />
              </div>

              <div className="career-form-group career-form-group-full">
                <label className="career-form-label">Upload Resume (PDF, DOCX)</label>
                <div className="career-form-file-wrap">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept=".pdf,.docx,.doc" 
                    onChange={onChangeFile}
                    className="career-form-file-input" 
                  />
                  <div className="career-form-file-label">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {formData.resumeName ? (
                      <p>Selected: <span>{formData.resumeName}</span></p>
                    ) : (
                      <p>Drag & drop or <span>browse file</span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="career-form-submit-btn"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
