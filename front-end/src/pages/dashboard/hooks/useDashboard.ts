import { useState, useEffect } from 'react';

export interface Environment {
  id: number;
  projectId: number;
  name: string;
  healthUrl: string;
  status?: 'UP' | 'DOWN';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  environments?: Environment[];
}

export function useDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverMessage, setServerMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    setServerMessage(null);
    try {
      const res = await fetch('http://localhost:4000/projects/full');
      const body = await res.json();
      if (res.ok && body?.data) {
        setProjects(body.data);
      } else {
        const errorMsg = body?.description || 'Failed to fetch projects';
        setError(errorMsg);
        setServerMessage({ message: errorMsg, type: 'error' });
      }
    } catch (e) {
      const errorMsg = 'Network error';
      setError(errorMsg);
      setServerMessage({ message: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/health/summary');
      const body = await res.json();
      if (res.ok && body?.data) {
        setHealthData(body.data);
      }
    } catch (e) {
      console.error('Health check failed', e);
    }
  };

  const createProject = async (
    name: string,
    description: string,
    environments?: { name: string; healthUrl: string }[],
  ) => {
    setLoading(true);
    setError('');
    setServerMessage(null);
    try {
      const res = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      const body = await res.json();
      if (res.ok && body?.code === 200 && body?.data) {
        const createdProject: Project = body.data;

        // If environments provided, create them against the projects service
        if (Array.isArray(environments) && environments.length > 0) {
          for (const env of environments) {
            try {
              await fetch(
                `http://localhost:4000/projects/${createdProject.id}/environments`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: env.name, healthUrl: env.healthUrl }),
                },
              );
            } catch (e) {
              // continue creating others even if one fails
              console.error('Failed to create environment', e);
            }
          }
        }

        await fetchProjects();
        setServerMessage({ message: body?.description || 'Project created successfully!', type: 'success' });
        return createdProject;
      } else {
        const errorMsg = body?.description || 'Failed to create project';
        setError(errorMsg);
        setServerMessage({ message: errorMsg, type: 'error' });
        return null;
      }
    } catch (e) {
      const errorMsg = 'Network error';
      setError(errorMsg);
      setServerMessage({ message: errorMsg, type: 'error' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchHealthStatus();
    const interval = setInterval(fetchHealthStatus, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return { projects, healthData, loading, error, serverMessage, createProject, fetchProjects };
}
