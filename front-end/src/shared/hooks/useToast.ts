import { useState, useCallback } from 'react';

export type ToastPosition = 'center' | 'bottom-right';
export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

export interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  position: ToastPosition;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
    position: 'bottom-right',
  });

  const showToast = useCallback(
    (
      message: string,
      severity: ToastSeverity = 'info',
      position: ToastPosition = 'bottom-right',
    ) => {
      setToast({
        open: true,
        message,
        severity,
        position,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return { toast, showToast, hideToast };
}
