import { useContext } from 'react';
import { NotificationContext } from '/src/contexts/NotificationContext';

// This hook now returns the AntD 'api' object
export const useNotifications = () => useContext(NotificationContext);