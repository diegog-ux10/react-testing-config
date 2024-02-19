import { LoginService, Session, User } from '../models';

const TOKEN_LOCAL_STORAGE_KEY = 'token';
const USER_LOCAL_STORAGE_KEY = 'user';

export const createSession = (token: string, user: User) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
};

export const deleteSession = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
};

export const getSession = (): Session => {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '{}')
    : null;

  return {
    token,
    user,
  };
};

export const loginService: LoginService = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (password === '123456' && email === 'email@example.com') {
      resolve({
        accessToken: 'acb',
        user: {
          email: 'email@example.com',
          role: 'admin',
          id: 1,
        },
      });
    } else {
      reject('Invalid credentials');
    }
  });
};
