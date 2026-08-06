'use client';

import React, { useState, useEffect } from 'react';
import { getJobPositions, getJobDepartments, JobPosition, JobDepartment } from '@/lib/strapi';
import './openpositions.css';

interface OpenPositionsProps {
  onApplyForRole: (jobTitle: string) => void;
  initialJobs?: JobPosition[];
  initialDepartments?: JobDepartment[];
}

export default function OpenPositions({ onApplyForRole, initialJobs, initialDepartments }: OpenPositionsProps) {
  const [jobs, setJobs] = useState<JobPosition[]>(initialJobs ?? []);
  const [departments, setDepartments] = useState<JobDepartment[]>(initialDepartments ?? []);
  const [loading, setLoading] = useState(!initialJobs || initialJobs.length === 0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedJobId, setExpandedJobId] = useState<string | number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedJobs, fetchedDepts] = await Promise.all([
          getJobPositions(),
          getJobDepartments()
        ]);
        setJobs(fetchedJobs);
        setDepartments(fetchedDepts);
      } catch (err) {
        console.error('Failed to fetch jobs from Strapi:', err);
      } finally {
        setLoading(false);
      }
    }
    if (!initialJobs || initialJobs.length === 0) {
      fetchData();
    }
  }, [initialJobs]);

  const toggleJob = (jobId: string | number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const filteredJobs = jobs.filter(job => {
    if (activeFilter === 'All') return true;
    const deptName = job.department?.name ?? '';
    return deptName.toLowerCase() === activeFilter.toLowerCase();
  });

  const filterList = ['All', ...departments.map(d => d.name)];

  return (
    <section className="career-jobs-section">
      <div className="container">
        <div id="open-positions" className="career-jobs-wrap">
          <h2 className="career-jobs-title">Current Open Positions</h2>
          
          {filterList.length > 1 && (
            <div className="career-jobs-filters">
              {filterList.map(dept => (
                <button
                  key={dept}
                  onClick={() => {
                    setActiveFilter(dept);
                    setExpandedJobId(null);
                  }}
                  className={`career-filter-btn ${activeFilter === dept ? 'active' : ''}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          <div className="career-jobs-list">
            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading open positions...</p>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.documentId ?? job.id} 
                  className={`career-job-item ${expandedJobId === (job.documentId ?? job.id) ? 'expanded' : ''}`}
                  onClick={() => toggleJob(job.documentId ?? job.id)}
                >
                  <div className="career-job-header">
                    <div className="career-job-meta">
                      <h3 className="career-job-title">{job.title}</h3>
                      <div className="career-job-tags">
                        {job.department?.name && (
                          <span className="career-job-tag career-job-tag-gold">{job.department.name}</span>
                        )}
                        {job.location && <span className="career-job-tag">{job.location}</span>}
                        {job.employmentType && <span className="career-job-tag">{job.employmentType}</span>}
                        {job.experienceLevel && <span className="career-job-tag">{job.experienceLevel}</span>}
                      </div>
                    </div>
                    <span className="career-job-arrow">▼</span>
                  </div>
                  
                  {expandedJobId === (job.documentId ?? job.id) && (
                    <div className="career-job-details" onClick={e => e.stopPropagation()}>
                      {job.description && <p>{job.description}</p>}
                      {job.requirements && (
                        <>
                          <div className="career-job-details-title">Key Requirements:</div>
                          <p style={{ whiteSpace: 'pre-line' }}>{job.requirements}</p>
                        </>
                      )}
                      <button 
                        onClick={() => onApplyForRole(job.title)} 
                        className="career-job-apply-btn"
                      >
                        Apply for this role
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No open positions found in this department.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
