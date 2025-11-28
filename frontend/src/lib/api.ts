// API service for job portal

const API_BASE_URL = 'http://assignment-3-server-kappa.vercel.app/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface JobData {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  description: string;
}

// Auth API
export const authAPI = {
  login: async (data: LoginData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
  
  register: async (data: RegisterData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  }
};

// Job Seeker API
export const jobSeekerAPI = {
  updateProfile: async (token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/seeker/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
  
  getAllJobs: async (token: string, filters?: { location?: string; jobType?: string }) => {
    let url = `${API_BASE_URL}/seeker/jobs`;
    
    if (filters) {
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.jobType) queryParams.append('jobType', filters.jobType);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
  
  getPublicJobs: async (filters?: { location?: string; jobType?: string }) => {
    let url = `${API_BASE_URL}/public/jobs`;
    
    if (filters) {
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.jobType) queryParams.append('jobType', filters.jobType);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;
    }
    
    const response = await fetch(url);
    return response.json();
  },
  
  getPublicJobById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/public/jobs/${id}`);
    return response.json();
  },
  
  getJobById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/seeker/jobs/${id}`);
    return response.json();
  },
  
  applyToJob: async (token: string, jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/seeker/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId }),
    });
    
    return response.json();
  },
  
  getAppliedJobs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/seeker/applied-jobs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  }
};

// Employer API
export const employerAPI = {
  createJob: async (token: string, data: JobData) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
  
  getEmployerJobs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  getJobById: async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  updateJob: async (token: string, id: string, data: JobData) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },
  
  deleteJob: async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  getApplicants: async (token: string, jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/employer/jobs/${jobId}/applicants`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  }
};

// Admin API
export const adminAPI = {
  getPendingEmployers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/pending-employers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  approveEmployer: async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/approve-employer/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  rejectEmployer: async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/reject-employer/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  getAllJobs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  getAllApplications: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/applications`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  getAllUsers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  },
  
  toggleUserBlock: async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/toggle-block/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.json();
  }
};