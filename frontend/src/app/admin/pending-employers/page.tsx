'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { adminAPI } from '@/lib/api';

interface Employer {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function PendingEmployers() {
  const { token } = useAuth();
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchPendingEmployers();
    }
  }, [token]);

  const fetchPendingEmployers = async () => {
    try {
      const data = await adminAPI.getPendingEmployers(token!);
      setEmployers(data);
    } catch (error) {
      console.error('Error fetching pending employers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (employerId: string) => {
    try {
      await adminAPI.approveEmployer(token!, employerId);
      // Refresh the list
      fetchPendingEmployers();
    } catch (error) {
      console.error('Error approving employer:', error);
      alert('Failed to approve employer');
    }
  };

  const handleReject = async (employerId: string) => {
    if (window.confirm('Are you sure you want to reject and remove this employer?')) {
      try {
        await adminAPI.rejectEmployer(token!, employerId);
        // Refresh the list
        fetchPendingEmployers();
      } catch (error) {
        console.error('Error rejecting employer:', error);
        alert('Failed to reject employer');
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pending Employers</h1>
            <p className="mt-2 text-gray-600">Review and approve employer account requests</p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Employer Requests</h3>
              <p className="mt-1 text-sm text-gray-500">List of employers awaiting approval</p>
            </div>
            
            <div className="px-4 py-5 sm:px-6">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : employers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Request Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employers.map((employer) => (
                        <tr key={employer._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{employer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(employer.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleApprove(employer._id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(employer._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pending employers</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All employer requests have been processed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}