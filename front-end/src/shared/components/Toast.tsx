import { Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import type { ToastState } from '../hooks/useToast';

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ toast, onClose, duration = 5000 }: ToastProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mobile always uses bottom-center full width
  const anchorOrigin = isMobile
    ? { vertical: 'bottom' as const, horizontal: 'center' as const }
    : toast.position === 'center'
    ? { vertical: 'top' as const, horizontal: 'center' as const }
    : { vertical: 'bottom' as const, horizontal: 'right' as const };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      sx={{
        ...(isMobile && {
          left: 8,
          right: 8,
          bottom: 8,
          '& .MuiSnackbarContent-root': {
            width: '100%',
          },
        }),
        ...(toast.position === 'center' && !isMobile && {
          top: '50%',
          transform: 'translateY(-50%)',
        }),
      }}
    >
      <Alert
        onClose={onClose}
        severity={toast.severity}
        sx={{
          width: '100%',
          minWidth: isMobile ? 'auto' : 300,
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};
