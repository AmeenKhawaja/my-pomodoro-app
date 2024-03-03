import React from 'react'
import styles from './Navbar.module.css'
const Navbar: React.FC = () => {
 // Add a state and function to handle dark mode toggle if needed
  // const [darkMode, setDarkMode] = useState(false);
  // const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <span className={styles.brand}>PomoWHATEVER</span>
        <div className={styles.navItems}>
          <button className={styles.navButton}>Settings</button>
          <button className={styles.navButton}>Login</button>

        </div>
      </div>
    </nav>
  );
};
export default Navbar