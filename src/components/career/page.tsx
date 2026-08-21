'use client';

import React, { useState, useRef } from 'react';
import { CareerPageSettingsData } from '@/lib/strapi';
import CareerHero from './careerhero/careerhero';
import CareerBenefits from './careerbenefits/careerbenefits';
import OpenPositions from './openpositions/openpositions';
import ApplyForm from './applyform/applyform';
import { submitJobApplication } from '@/lib/strapi';

interface CareerPageProps { data?: CareerPageSettingsData | null; }

export default function CareerPage({ data }: CareerPageProps) {
  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    position: string;
    message: string;
    resumeName: string;
    resumeFile: File | null;
  }>({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resumeName: '',
    resumeFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApplyForRole = (jobTitle: string) => {
    setFormData(prev => ({ ...prev, position: jobTitle }));
    
    // Scroll to form smoothly
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, resumeName: file.name, resumeFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitJobApplication({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        coverNote: formData.message,
        jobPosition: formData.position,
        experienceYears: '',
        currentCity: '',
        resumeFile: formData.resumeFile,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          resumeName: '',
          resumeFile: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Auto dismiss success message after 5s
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(result.error ?? 'Failed to submit application.');
        alert(result.error ?? 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToOpenPositions = () => {
    const jobsSection = document.getElementById('open-positions');
    jobsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToApplyForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
            
      <main>
        {/* Career Hero */}
        <CareerHero 
          data={data}
          onApplyClick={scrollToApplyForm}
          onViewPositionsClick={scrollToOpenPositions}
        />

        {/* Career Benefits */}
        <CareerBenefits data={data} />

        {/* Open Positions List */}
        <OpenPositions 
          onApplyForRole={handleApplyForRole}
        />

        {/* Application Form */}
        <div ref={formRef} style={{ scrollMarginTop: '100px' }}>
          <ApplyForm 
            formData={formData}
            onChangeInput={handleInputChange}
            onChangeFile={handleFileChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            fileInputRef={fileInputRef}
          />
        </div>
      </main>

          </>
  );
}
