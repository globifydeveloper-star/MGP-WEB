import React, { useState } from 'react';
import './openpositions.css';

interface Job {
  id: string;
  title: string;
  department: 'Sales' | 'Operations' | 'Technology';
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

const JOBS_DATA: Job[] = [
  {
    id: 'sales-1',
    title: 'Branch Relationship Executive',
    department: 'Sales',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '1-3 Years',
    description: 'We are seeking a proactive Branch Relationship Executive to engage with clients, explain the gold valuation and selling process, and build lasting customer relationships at our branches.',
    requirements: [
      'Prior experience in retail banking, gold loan, or financial services sales.',
      'Excellent verbal communication and customer relationship skills.',
      'Ability to explain financial procedures clearly and build trust with clients.',
      'Fluency in local language and English is preferred.'
    ]
  },
  {
    id: 'ops-1',
    title: 'Customer Relationship Manager',
    department: 'Operations',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '3-5 Years',
    description: 'Ensure smooth branch operations, oversee transparent gold testing protocols, handle client escalations, and manage a team of valuation executives to guarantee top-tier service.',
    requirements: [
      'Proven track record in operations management, preferably in the gold loan or gold buying sector.',
      'Strong leadership abilities and team management experience.',
      'Deep understanding of customer service metrics and branch compliance.',
      'Good troubleshooting and dispute resolution skills.'
    ]
  },
  {
    id: 'tech-1',
    title: 'Frontend React/Next.js Developer',
    department: 'Technology',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '2-4 Years',
    description: 'Join our digital transformation team to craft beautiful, responsive, and high-performance web applications using React, Next.js, and modern styling libraries.',
    requirements: [
      'Strong expertise in JavaScript, TypeScript, React.js, and Next.js App Router.',
      'Experience building responsive layouts with pixel-perfect CSS/styling.',
      'Understanding of web performance optimization and SEO best practices.',
      'Familiarity with Git workflows and modern frontend build tools.'
    ]
  },
  {
    id: 'ops-2',
    title: 'Valuation & XRF Specialist',
    department: 'Operations',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: '1-3 Years',
    description: 'Conduct scientific purity assessment of gold ornaments using advanced XRF testing machines, explain purity findings transparently to clients, and handle instant cash processing.',
    requirements: [
      'Technical proficiency in gold testing, smelting, or laboratory evaluation methods.',
      'High integrity and focus on transparency and compliance.',
      'Basic computer literacy for logging valuation details into the POS software.',
      'Punctuality and professional client-facing demeanor.'
    ]
  }
];

interface OpenPositionsProps {
  onApplyForRole: (jobTitle: string) => void;
}

export default function OpenPositions({ onApplyForRole }: OpenPositionsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Sales' | 'Operations' | 'Technology'>('All');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const toggleJob = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const filteredJobs = JOBS_DATA.filter(job => 
    activeFilter === 'All' ? true : job.department === activeFilter
  );

  return (
    <section className="career-jobs-section">
      <div className="container">
        <div id="open-positions" className="career-jobs-wrap">
          <h2 className="career-jobs-title">Current Open Positions</h2>
          
          <div className="career-jobs-filters">
            {(['All', 'Sales', 'Operations', 'Technology'] as const).map(dept => (
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

          <div className="career-jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className={`career-job-item ${expandedJobId === job.id ? 'expanded' : ''}`}
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="career-job-header">
                    <div className="career-job-meta">
                      <h3 className="career-job-title">{job.title}</h3>
                      <div className="career-job-tags">
                        <span className="career-job-tag career-job-tag-gold">{job.department}</span>
                        <span className="career-job-tag">{job.location}</span>
                        <span className="career-job-tag">{job.type}</span>
                        <span className="career-job-tag">{job.experience}</span>
                      </div>
                    </div>
                    <span className="career-job-arrow">▼</span>
                  </div>
                  
                  {expandedJobId === job.id && (
                    <div className="career-job-details" onClick={e => e.stopPropagation()}>
                      <p>{job.description}</p>
                      <div className="career-job-details-title">Key Requirements:</div>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
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
export { JOBS_DATA };
