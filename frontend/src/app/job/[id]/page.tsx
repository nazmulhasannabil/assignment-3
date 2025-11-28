'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { jobSeekerAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  description: string;
  postedBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params);
  const { token, user } = useAuth();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await jobSeekerAPI.getPublicJobById(id);
      setJob(data);
      
      // Check if user has already applied (only if logged in)
      if (token && user?.role === 'jobseeker') {
        const applications = await jobSeekerAPI.getAppliedJobs(token);
        const hasApplied = applications.some((app: any) => app.jobId?._id === data._id);
        setApplied(hasApplied);
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!token || user?.role !== 'jobseeker') {
      router.push('/login');
      return;
    }

    setApplying(true);
    setError('');

    try {
      await jobSeekerAPI.applyToJob(token, id);
      setApplied(true);
    } catch (err: any) {
      setError(err.message || 'Failed to apply for job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="mt-1 text-lg text-gray-600">{job.company}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {job.jobType}
              </span>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Job Description</h2>
                  <div className="mt-2 text-gray-600 whitespace-pre-line">
                    {job.description}
                  </div>
                </div>
                
                {job.salaryRange && (
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Salary Range</h2>
                    <p className="mt-2 text-gray-600">${job.salaryRange}</p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-900">Job Details</h3>
                  <dl className="mt-2 space-y-3">
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 w-24 text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-sm text-gray-900">{job.location}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 w-24 text-sm font-medium text-gray-500">Posted by</dt>
                      <dd className="text-sm text-gray-900">{job.postedBy.name}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 w-24 text-sm font-medium text-gray-500">Posted on</dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                  
                  {user?.role === 'jobseeker' && (
                    <div className="mt-6">
                      {applied ? (
                        <button
                          disabled
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Applied
                        </button>
                      ) : (
                        <button
                          onClick={handleApply}
                          disabled={applying}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          {applying ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Applying...
                            </>
                          ) : (
                            'Apply for this job'
                          )}
                        </button>
                      )}
                    </div>
                  )}
                  
                  {user?.role !== 'jobseeker' && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        {user ? (
                          'Only job seekers can apply for jobs.'
                        ) : (
                          <>
                            <button 
                              onClick={() => router.push('/login')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Log in
                            </button>{' '}
                            as a job seeker to apply for this job.
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}