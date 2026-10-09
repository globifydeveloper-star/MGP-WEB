'use client';

import React, { useState, useRef } from 'react';
import type { CareerPageSettingsData } from '@/lib/strapi';
import CareerHero from './careerhero/careerhero';
import CareerBenefits from './careerbenefits/careerbenefits';
import OpenPositions from './openpositions/openpositions';
import ApplyForm from './applyform/applyform';
import ApplicationSuccessModal from './ApplicationSuccessModal';
import { submitJobAction } from '@/actions/submitJob';

interface CareerPageProps { data?: CareerPageSettingsData | null; }

export default function CareerPage({ data }: CareerPageProps) {
  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    currentCity: string;
    experienceYears: string;
    noticePeriod: string;
    position: string;
    message: string;
    resumeName: string;
    resumeFile: File | null;
  }>({
    name: '',
    email: '',
    phone: '',
    currentCity: '',
    experienceYears: '',
    noticePeriod: '',
    position: '',
    message: '',
    resumeName: '',
    resumeFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{ name: string; position: string }>({ name: '', position: '' });
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
    if (name === 'phone') {
      const val = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: val }));
      return;
    }
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
    if (!formData.name || !formData.email || !formData.phone || !formData.position || !formData.currentCity || !formData.experienceYears || !formData.noticePeriod) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!formData.resumeFile) {
      alert('Please upload your resume (PDF or DOCX).');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const currentName = formData.name;
      const currentPosition = formData.position;

      const result = await (async () => {
        const fd = new FormData();
        fd.append('fullName', formData.name);
        fd.append('email', formData.email);
        fd.append('phone', formData.phone);
        fd.append('currentCity', formData.currentCity);
        fd.append('experienceYears', formData.experienceYears);
        fd.append('noticePeriod', formData.noticePeriod);
        fd.append('coverNote', formData.message);
        fd.append('jobPosition', formData.position);
        if (formData.resumeFile) fd.append('resumeFile', formData.resumeFile);
        return submitJobAction(fd);
      })();

      if (result.success) {
        setSubmittedInfo({ name: currentName, position: currentPosition });
        setIsSuccessModalOpen(true);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          currentCity: '',
          experienceYears: '',
          noticePeriod: '',
          position: '',
          message: '',
          resumeName: '',
          resumeFile: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Auto dismiss banner after 6s
        setTimeout(() => setSubmitSuccess(false), 6000);
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

        {/* Success Modal Popup */}
        <ApplicationSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          applicantName={submittedInfo.name}
          positionTitle={submittedInfo.position}
        />
      </main>
    </>
  );
}
