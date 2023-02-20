import {
  FaCheck,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';
import { ToastMap } from '.';

export const toastMap: ToastMap = {
  success: {
    color: '#34d399',
    icon: <FaCheck />,
  },
  error: {
    color: '#f87171',
    icon: <FaTimes />,
  },
  info: {
    color: '#3b82f6',
    icon: <FaInfoCircle />,
  },
  warning: {
    color: '#ff9f43',
    icon: <FaExclamationCircle />,
  },
};
