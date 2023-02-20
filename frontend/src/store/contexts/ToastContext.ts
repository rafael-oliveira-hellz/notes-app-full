/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { IToastContext } from '../../components/Toast/helpers';

export const ToastContext = createContext<IToastContext>({
  toastList: [],
  setToastList: () => {},
});
