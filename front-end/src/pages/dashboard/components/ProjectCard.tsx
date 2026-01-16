import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  IconButton,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Project, Environment } from '../hooks/useDashboard';

interface ProjectCardProps {
  project: Project;
  healthData: any[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, healthData }) => {
  const [expanded, setExpanded] = useState(false);

  const getEnvironmentStatus = (projectName: string, envName: string) => {
    const entry = healthData.find(
      (h) => h.project === projectName && h.environment === envName
    );
    return entry?.status === 'UP' ? 'UP' : 'DOWN';
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{project.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '0.3s',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Environments:
            </Typography>
            {project.environments && project.environments.length > 0 ? (
              project.environments.map((env: Environment) => {
                const status = getEnvironmentStatus(project.name, env.name);
                return (
                  <Box
                    key={env.id}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: status === 'UP' ? 'green' : 'red',
                      }}
                    />
                    <Typography variant="body2">{env.name}</Typography>
                    <Chip
                      label={status}
                      size="small"
                      color={status === 'UP' ? 'success' : 'error'}
                    />
                  </Box>
                );
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                No environments
              </Typography>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
