import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';

import { Card, SignInContainer } from './styles/styles';
import { useSignIn } from './hooks/useSignIn';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../shared/components/Toast';
import { useToast } from '../../shared/hooks/useToast';

export default function SignIn() {
  const { submit, errors, loading, serverMessage } = useSignIn();
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  // Show toast when serverMessage changes
  useEffect(() => {
    if (serverMessage) {
      showToast(
        serverMessage.message,
        serverMessage.type,
        serverMessage.type === 'error' ? 'center' : 'bottom-right'
      );
    }
  }, [serverMessage, showToast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const success = await submit(String(data.get('email')), String(data.get('password')), remember);
    
    if (success) {
      navigate('/dashboard') ;
    }

  };


  return (
    <>
      <CssBaseline />
      <SignInContainer>
        <Card>
          <Typography variant="h4">Sign in</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
                disabled={loading}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                />
              }
              label="Remember me"
            />

            <Button type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      <Toast toast={toast} onClose={hideToast} />
    </>
  );
}
