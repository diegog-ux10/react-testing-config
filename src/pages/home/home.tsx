import { useNavigate } from 'react-router-dom';

import { deleteSession } from '../../services';

import styles from './home.module.css';

export const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteSession();
    navigate('login');
  };
  return (
    <header className={styles['hero']}>
      <div className={styles['hero-content']}>
        <h1 className={styles['hero-title']}>Bienvenida</h1>
        <p className={styles['hero-subtitle']}>Gracias por visitarnos</p>
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
    </header>
  );
};
