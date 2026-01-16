import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 2
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '80px', sm: '120px' },
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h4"
          sx={{
            color: 'text.secondary',
            mb: 2
          }}
        >
          Página no encontrada
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: '500px',
            mb: 3
          }}
        >
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}
