import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
    environments: { name: string; healthUrl: string }[],
  ) => Promise<any>;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [environments, setEnvironments] = useState<{
    name: string;
    healthUrl: string;
  }[]>([{ name: '', healthUrl: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setError(null);
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setError(null);
    setStep(1);
  };

  const updateEnv = (index: number, field: 'name' | 'healthUrl', value: string) => {
    setEnvironments((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addEnv = () => setEnvironments((prev) => [...prev, { name: '', healthUrl: '' }]);

  const removeEnv = (index: number) => {
    setEnvironments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    setError(null);
    // validate at least one env with name and healthUrl
    const validEnvs = environments.filter((e) => e.name.trim() && e.healthUrl.trim());
    if (validEnvs.length === 0) {
      setError('At least one environment with name and health URL is required');
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit(name.trim(), description.trim(), validEnvs);
      if (result) {
        setName('');
        setDescription('');
        setEnvironments([{ name: '', healthUrl: '' }]);
        setStep(1);
        onClose();
      } else {
        setError('Failed to create project');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Step {step} of 2
          </Typography>

          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
              />
            </>
          )}

          {step === 2 && (
            <Box>
              {environments.map((env, idx) => (
                <Box key={idx} display="flex" gap={1} alignItems="center" mb={1}>
                  <TextField
                    label="Env name"
                    value={env.name}
                    onChange={(e) => updateEnv(idx, 'name', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Health URL"
                    value={env.healthUrl}
                    onChange={(e) => updateEnv(idx, 'healthUrl', e.target.value)}
                    sx={{ flex: 2 }}
                  />
                  <IconButton onClick={() => removeEnv(idx)} disabled={environments.length === 1}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button startIcon={<AddIcon />} onClick={addEnv} sx={{ mt: 1 }}>
                Add environment
              </Button>
            </Box>
          )}

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        {step === 2 ? (
          <>
            <Button onClick={handleBack} disabled={loading}>
              Back
            </Button>
            <Button onClick={handleCreate} variant="contained" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
