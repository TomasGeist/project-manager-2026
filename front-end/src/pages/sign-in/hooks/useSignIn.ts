import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';

export function useSignIn() {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = (email: string, password: string) => {
    const newErrors: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (email: string, password: string, remember = false) => {
    if (!validate(email, password)) return false;
    setLoading(true);
    setErrors({});
    setServerMessage(null);
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (res.ok && body?.code === 200 && body?.data?.token) {
        auth.login(body.data.token, remember);
        setServerMessage({ message: body?.description || 'Login successful!', type: 'success' });
        setLoading(false);
        setTimeout(() => navigate('/dashboard'), 1000);
        return true;
      } else {
        setServerMessage({ message: body?.description || 'Login failed', type: 'error' });
        setLoading(false);
        return false;
      }
    } catch (e) {
      setServerMessage({ message: 'Network error. Please try again.', type: 'error' });
      setLoading(false);
      return false;
    }
  };

  return { submit, errors, loading, serverMessage };
}