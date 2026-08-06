'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CareerHero from './careerhero/careerhero';
import CareerBenefits from './careerbenefits/careerbenefits';
import OpenPositions from './openpositions/openpositions';
import ApplyForm from './applyform/applyform';
import { submitJobApplication } from '@/lib/strapi';

export default function CareerPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resumeName: ''
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
      setFormData(prev => ({ ...prev, resumeName: e.target.files![0].name }));
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
        experienceYears: '',
        currentCity: ''
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          resumeName: ''
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
      <Navbar />
      
      <main>
        {/* Career Hero */}
        <CareerHero 
          onApplyClick={scrollToApplyForm}
          onViewPositionsClick={scrollToOpenPositions}
        />

        {/* Career Benefits */}
        <CareerBenefits />

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

      <Footer />
    </>
  );
}
