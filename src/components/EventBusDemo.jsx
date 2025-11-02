import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Paper, Alert, Divider, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useEventPublisher, useEventSubscription, EVENT_TYPES } from '@mfe/shared-eventbus';

export default function EventBusDemo() {
  const publish = useEventPublisher();
  const [eventLog, setEventLog] = useState([]);
  const [publishCount, setPublishCount] = useState(0);

  const addToEventLog = useCallback((eventType, message, severity) => {
    const logEntry = {
      id: Date.now(),
      eventType,
      message,
      severity,
      timestamp: new Date().toLocaleTimeString()
    };
    setEventLog(prev => [logEntry, ...prev].slice(0, 5));
  }, []);

  // Listen to all todo events for demo purposes
  useEventSubscription(EVENT_TYPES.TODO_ADDED, (data) => {
    addToEventLog('TODO_ADDED', data.title, 'success');
  }, [addToEventLog]);

  useEventSubscription(EVENT_TYPES.TODO_DELETED, (data) => {
    addToEventLog('TODO_DELETED', data.title, 'info');
  }, [addToEventLog]);

  const handleTestEvent = () => {
    publish(EVENT_TYPES.NOTIFICATION, {
      message: 'Test notification from Shell App!',
      severity: 'success'
    });
    setPublishCount(prev => prev + 1);
    addToEventLog('NOTIFICATION', 'Test notification sent', 'success');
  };

  const handleTodoEvent = () => {
    const todoTitle = `Sample Todo ${Date.now()}`;
    publish(EVENT_TYPES.TODO_ADDED, {
      id: Date.now(),
      title: todoTitle,
      completed: false
    });
    
    publish(EVENT_TYPES.NOTIFICATION, {
      message: 'Todo event published!',
      severity: 'info'
    });
    
    setPublishCount(prev => prev + 1);
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        m: 2,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          🚀 Event Bus Demo
        </Typography>
        <Chip 
          label={`${publishCount} events published`}
          sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }}
        />
      </Box>
      
      <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
        Test cross-MFE communication using the Event Bus. Publish events and watch them flow across microfrontends!
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={handleTestEvent}
          startIcon={<NotificationsActiveIcon />}
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          Send Notification
        </Button>
        <Button 
          variant="contained"
          onClick={handleTodoEvent}
          startIcon={<PlaylistAddIcon />}
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
          }}
        >
          Publish Todo Event
        </Button>
      </Box>

      {eventLog.length > 0 && (
        <>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            📡 Event Log (Last 5 Events)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {eventLog.map((log) => (
              <Alert 
                key={log.id}
                severity={log.severity}
                icon={<SendIcon />}
                sx={{ 
                  animation: 'fadeIn 0.3s ease-in',
                  fontSize: '0.85rem'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <strong>{log.eventType}</strong> - {log.message}
                  </Box>
                  <Typography variant="caption" sx={{ ml: 2, opacity: 0.7 }}>
                    {log.timestamp}
                  </Typography>
                </Box>
              </Alert>
            ))}
          </Box>
        </>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Paper>
  );
}
