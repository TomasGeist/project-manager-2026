import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDashboard } from './hooks/useDashboard';
import { ProjectCard } from './components/ProjectCard';
import { CreateProjectDialog } from './components/CreateProjectDialog';
import { DashboardContainer } from './styles/styles';
import { Toast } from '../../shared/components/Toast';
import { useToast } from '../../shared/hooks/useToast';

export default function Dashboard() {
  const { projects, healthData, loading, error, serverMessage, createProject } = useDashboard();
  const [dialogOpen, setDialogOpen] = useState(false);
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

  return (
    <DashboardContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Projects Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          New Project
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && projects.length === 0 ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} healthData={healthData} />
          ))}
        </Stack>
      )}

      {!loading && projects.length === 0 && (
        <Box textAlign="center" p={4}>
          <Typography color="text.secondary">
            No projects yet. Create your first one!
          </Typography>
        </Box>
      )}

      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={createProject}
      />
      <Toast toast={toast} onClose={hideToast} />
    </DashboardContainer>
  );
}
