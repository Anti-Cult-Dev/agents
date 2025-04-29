import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  Search, 
  HelpCircle, 
  User,
  ChevronDown,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
        alert(`Searching for: ${searchQuery}`);
      }, 1000);
    }
  };

  const handleLogout = () => {
    alert("Logout functionality will be implemented with authentication system");
  };

  const handleProfileClick = () => {
    alert("Profile page coming soon!");
  };

  const handleHelpOption = (option: string) => {
    alert(`Navigating to ${option}`);
    setShowHelp(false);
  };
  
  return (
    <header className={`z-10 py-4 px-6 shadow-sm ${isDark ? 'bg-dark-surface border-b border-dark-border' : 'bg-white'} transition-colors duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDark 
                  ? 'bg-dark-bg text-dark-text border-dark-border focus:bg-dark-surface' 
                  : 'text-gray-700 bg-gray-100 focus:bg-white'
              }`}
            />
            {searchQuery ? (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5"
              >
                <X className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-400'}`} />
              </button>
            ) : (
              <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-400'}`} />
            )}
            {isSearching && (
              <div className={`absolute top-full left-0 right-0 mt-1 p-4 rounded-md shadow-lg z-10 ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                  <span className={`ml-2 text-sm ${isDark ? 'text-dark-text' : 'text-gray-600'}`}>Searching...</span>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDark 
                ? 'text-yellow-300 hover:bg-dark-border' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-1 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'text-dark-text hover:bg-dark-border' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 z-50 border ${
                isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
              }`}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Notifications</h3>
                    <button 
                      className={`text-xs ${
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                      }`}
                      onClick={() => {
                        alert("All notifications marked as read");
                        setShowNotifications(false);
                      }}
                    >
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className={`text-center py-6 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                    <p className="text-sm">No notifications yet</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className={`p-1 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'text-dark-text hover:bg-dark-border' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <HelpCircle className="h-6 w-6" />
            </button>
            
            {showHelp && (
              <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 z-50 border ${
                isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
              }`}>
                <div className="p-4">
                  <h3 className={`font-medium mb-2 ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Help & Resources</h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                    <li>
                      <button 
                        className={`block w-full text-left hover:${isDark ? 'text-dark-text' : 'text-gray-800'}`}
                        onClick={() => handleHelpOption('Documentation')}
                      >
                        Documentation
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`block w-full text-left hover:${isDark ? 'text-dark-text' : 'text-gray-800'}`}
                        onClick={() => handleHelpOption('Tutorials')}
                      >
                        Tutorials
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`block w-full text-left hover:${isDark ? 'text-dark-text' : 'text-gray-800'}`}
                        onClick={() => handleHelpOption('API Reference')}
                      >
                        API Reference
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`block w-full text-left hover:${isDark ? 'text-dark-text' : 'text-gray-800'}`}
                        onClick={() => handleHelpOption('Support')}
                      >
                        Contact Support
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/settings" className={`p-1 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark ? 'text-dark-text hover:bg-dark-border' : 'text-gray-500 hover:text-blue-500'
          }`}>
            <Settings className="h-6 w-6" />
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center text-sm focus:outline-none"
            >
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <span className={`hidden md:block font-medium ${isDark ? 'text-dark-text' : ''}`}>John Doe</span>
                <ChevronDown className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
              </div>
            </button>
            
            {isProfileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 border ${
                isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
              }`}>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={handleProfileClick}
                >
                  Your Profile
                </button>
                <Link 
                  to="/settings" 
                  className={`block px-4 py-2 text-sm ${
                    isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;