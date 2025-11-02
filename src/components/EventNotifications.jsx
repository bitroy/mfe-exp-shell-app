import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useEventSubscription, EVENT_TYPES } from '@mfe/shared-eventbus';

export default function EventNotifications() {
  const [notification, setNotification] = useState(null);

  useEventSubscription(EVENT_TYPES.NOTIFICATION, (data) => {
    setNotification(data);
  }, []);

  const handleClose = () => {
    setNotification(null);
  };

  if (!notification) return null;

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={notification.severity || 'info'}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
