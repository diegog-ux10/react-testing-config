import { FC, useEffect, useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks';

type LoginFormFields = {
  email: string;
  password: string;
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const Login: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState<LoginFormFields>({
    email: '',
    password: '',
  });

  const { login, loginStatus } = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      payload: formData,
      options: {
        onSuccess: () => {
          navigate('/');
        },
      },
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['card']}>
        <h2>React Testing Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />
          <button type="submit" disabled={loginStatus === 'loading'}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
