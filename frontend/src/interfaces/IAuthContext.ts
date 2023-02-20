import { ToastMapKey } from '../components/Toast/helpers';
import { IUser, IUserAuth, IUserSignUp } from '../interfaces';

export interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (user: IUserAuth) => Promise<void>;
  logout: () => void;
  register: (user: IUserSignUp) => Promise<void>;
  registerByAdmin: (user: IUserSignUp) => Promise<void>;
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  type: ToastMapKey | null;
  setType: React.Dispatch<React.SetStateAction<ToastMapKey | null>>;
}
