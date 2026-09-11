import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ScanText, Clipboard, Pill, Calendar, 
  Sparkles, Download, Settings, Sun, Moon, LogOut 
} from 'lucide-react';
import './SidebarMenu.css';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Default to light mode if nothing is saved
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate('/login');
      closeMenu();
    }
  };

  const topMenuItems = [
    { name: 'OCR Reader', icon: <ScanText size={20} />, path: '/ocr-reader' },
    { name: 'Medical History', icon: <Clipboard size={20} />, path: '/medical-history' },
    { name: 'Missed Doses', icon: <Pill size={20} />, path: '/dashboard' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/calendar' },
    { name: 'Antigravity', icon: <Sparkles size={20} />, path: '/antigravity' },
  ];

  return (
    <>
      <button 
        className="hamburger-btn" 
        onClick={toggleMenu} 
        aria-label="Open Menu"
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="menu-list">
            {topMenuItems.map((item) => (
              <li key={item.name}>
                <button 
                  className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="menu-divider" />
          
          <ul className="menu-list">
            <li>
              <button 
                className={`menu-item ${location.pathname === '/download-settings' ? 'active' : ''}`}
                onClick={() => handleNavigation('/download-settings')}
              >
                <span className="menu-icon">
                  <Download size={18} style={{ marginRight: '-8px', marginBottom: '-4px' }} />
                  <Settings size={20} />
                </span>
                <span className="menu-text">Download Settings</span>
              </button>
            </li>
            <li>
              <button className="menu-item" onClick={toggleTheme}>
                <span className="menu-icon">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </span>
                <span className="menu-text">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </li>
          </ul>

          <div className="menu-divider" />

          <ul className="menu-list">
            <li>
              <button className="menu-item logout-btn" onClick={handleLogout}>
                <span className="menu-icon"><LogOut size={20} /></span>
                <span className="menu-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
