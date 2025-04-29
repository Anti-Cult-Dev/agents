import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Save, 
  Moon, 
  Sun, 
  Monitor, 
  User, 
  Key, 
  Globe, 
  ShieldCheck, 
  BellRing, 
  HelpCircle,
  Check,
  Plus,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeSection, setActiveSection] = useState('appearance');
  const [apiKey, setApiKey] = useState('sk-............................');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fontSize, setFontSize] = useState<number>(3);
  const [useAnimations, setUseAnimations] = useState<boolean>(true);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');
  const [showConnectServiceModal, setShowConnectServiceModal] = useState(false);
  
  const handleSaveSettings = () => {
    setSaveSuccess(true);
    alert("Settings saved successfully!");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDisconnectService = (service: string) => {
    if (window.confirm(`Are you sure you want to disconnect ${service}?`)) {
      alert(`${service} has been disconnected`);
    }
  };

  const handleAddNewService = () => {
    setShowConnectServiceModal(true);
  };

  const handleConnectNewService = (serviceName: string) => {
    alert(`${serviceName} has been connected successfully`);
    setShowConnectServiceModal(false);
  };

  const handleUpdateApiKey = () => {
    alert("API key updated successfully");
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Settings</h1>
          <p className={isDark ? 'text-dark-text-secondary' : 'text-gray-500'}>Configure your agent building environment</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saveSuccess ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
          <span>{saveSuccess ? 'Saved' : 'Save Changes'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        <div className={`lg:col-span-1 rounded-lg border p-4 ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <nav className="space-y-1">
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'appearance' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('appearance')}
            >
              <Monitor className="h-5 w-5" />
              <span>Appearance</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'account' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('account')}
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'api' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('api')}
            >
              <Key className="h-5 w-5" />
              <span>API Keys</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'language' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('language')}
            >
              <Globe className="h-5 w-5" />
              <span>Language & Region</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'privacy' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('privacy')}
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Privacy & Security</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'notifications' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('notifications')}
            >
              <BellRing className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                activeSection === 'help' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('help')}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </button>
          </nav>
        </div>
        
        <div className={`lg:col-span-4 rounded-lg border p-6 ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          {activeSection === 'appearance' && (
            <div>
              <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Appearance</h2>
              
              <div className={`mb-8 p-4 rounded-lg border ${
                isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                      theme === 'light' 
                        ? isDark 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-blue-500 bg-blue-50' 
                        : isDark 
                          ? 'border-dark-border hover:border-blue-500' 
                          : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => theme === 'dark' && toggleTheme()}
                  >
                    <div className={`w-full h-24 mb-4 rounded border ${
                      isDark ? 'bg-white border-gray-300' : 'bg-white border-gray-300'
                    }`}>
                      <div className={`h-6 w-full bg-gray-100 border-b border-gray-300`} />
                      <div className="p-2">
                        <div className="w-2/3 h-2 bg-gray-200 rounded mb-2" />
                        <div className="w-1/2 h-2 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-amber-500 mr-2" />
                      <span className={isDark ? 'text-dark-text' : 'text-gray-800'}>Light</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                      theme === 'dark' 
                        ? isDark 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-blue-500 bg-blue-50' 
                        : isDark 
                          ? 'border-dark-border hover:border-blue-500' 
                          : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => theme === 'light' && toggleTheme()}
                  >
                    <div className={`w-full h-24 mb-4 rounded border ${
                      isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-900 border-gray-700'
                    }`}>
                      <div className={`h-6 w-full bg-gray-800 border-b border-gray-700`} />
                      <div className="p-2">
                        <div className="w-2/3 h-2 bg-gray-700 rounded mb-2" />
                        <div className="w-1/2 h-2 bg-gray-700 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 text-blue-400 mr-2" />
                      <span className={isDark ? 'text-dark-text' : 'text-gray-800'}>Dark</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                      isDark ? 'border-dark-border hover:border-blue-500' : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => alert('System theme will follow your operating system preference')}
                  >
                    <div className={`w-full h-24 mb-4 rounded border overflow-hidden ${
                      isDark ? 'border-dark-border' : 'border-gray-300'
                    }`}>
                      <div className="h-1/2 bg-white">
                        <div className="h-6 w-full bg-gray-100 border-b border-gray-300" />
                      </div>
                      <div className="h-1/2 bg-gray-900">
                        <div className="h-6 w-full bg-gray-800 border-b border-gray-700" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Monitor className="h-5 w-5 text-gray-500 mr-2" />
                      <span className={isDark ? 'text-dark-text' : 'text-gray-800'}>System</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`mb-6 p-4 rounded-lg border ${
                isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Font Size</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-gray-600'}>Small</span>
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-gray-600'}>Large</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))} 
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Animation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-dark-text' : 'text-gray-800'}>Use animations</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useAnimations}
                        onChange={() => setUseAnimations(!useAnimations)}
                        className="sr-only peer" 
                      />
                      <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer ${
                        isDark 
                          ? 'bg-gray-700 peer-checked:bg-blue-600 peer-focus:ring-blue-800' 
                          : 'bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-blue-300'
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-dark-text' : 'text-gray-800'}>Reduce motion</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={reduceMotion}
                        onChange={() => setReduceMotion(!reduceMotion)}
                        className="sr-only peer" 
                      />
                      <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer ${
                        isDark 
                          ? 'bg-gray-700 peer-checked:bg-blue-600 peer-focus:ring-blue-800' 
                          : 'bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-blue-300'
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'api' && (
            <div>
              <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>API Keys</h2>
              
              <div className={`mb-6 p-4 rounded-lg border ${
                isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>OpenAI API Key</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                    }`}>
                      API Key
                    </label>
                    <div className="flex">
                      <input 
                        type={showApiKey ? "text" : "password"} 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className={`flex-1 p-2 border rounded-l-md ${
                          isDark 
                            ? 'bg-dark-surface border-dark-border text-dark-text focus:border-blue-500' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      />
                      <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className={`px-4 rounded-r-md ${
                          isDark 
                            ? 'bg-dark-surface border border-l-0 border-dark-border text-dark-text-secondary hover:text-dark-text' 
                            : 'bg-gray-100 border border-l-0 border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {showApiKey ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                      Your API key is stored securely and never shared.
                    </p>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                    }`}>
                      Model
                    </label>
                    <select 
                      className={`w-full p-2 border rounded-md ${
                        isDark 
                          ? 'bg-dark-surface border-dark-border text-dark-text focus:border-blue-500' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                    >
                      <option value="gpt-4-turbo">gpt-4-turbo</option>
                      <option value="gpt-4">gpt-4</option>
                      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={handleUpdateApiKey}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        isDark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Update API Key
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Connected Services</h3>
                  <button 
                    onClick={handleAddNewService}
                    className={`text-sm font-medium ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}>
                    Add New
                  </button>
                </div>
                
                <div className={`p-3 mb-3 rounded border flex justify-between items-center ${
                  isDark ? 'border-dark-border' : 'border-gray-200'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isDark ? 'bg-dark-surface' : 'bg-blue-100'
                    }`}>
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill={isDark ? "#60A5FA" : "#3B82F6"}>
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                      </svg>
                    </div>
                    <div>
                      <div className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>OpenAI</div>
                      <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Connected on May 21, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                    }`}>Active</span>
                    <button 
                      onClick={() => handleDisconnectService('OpenAI')}
                      className={`ml-4 text-sm ${
                        isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
                
                <div className={`p-3 rounded border flex justify-between items-center ${
                  isDark ? 'border-dark-border' : 'border-gray-200'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isDark ? 'bg-dark-surface' : 'bg-purple-100'
                    }`}>
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill={isDark ? "#C084FC" : "#9333EA"}>
                        <path d="M10.5 19.5a1.5 1.5 0 0 0 3 0v-5.5H18a1.5 1.5 0 0 0 0-3h-4.5V6.5a1.5 1.5 0 0 0-3 0V11H6a1.5 1.5 0 0 0 0 3h4.5v5.5Z" />
                      </svg>
                    </div>
                    <div>
                      <div className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Anthropic</div>
                      <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Connected on May 15, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                    }`}>Active</span>
                    <button 
                      onClick={() => handleDisconnectService('Anthropic')}
                      className={`ml-4 text-sm ${
                        isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
              
              {showConnectServiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className={`w-full max-w-md rounded-lg shadow-lg p-6 ${
                    isDark ? 'bg-dark-surface' : 'bg-white'
                  }`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Connect New Service</h3>
                      <button 
                        onClick={() => setShowConnectServiceModal(false)}
                        className={isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div
                        onClick={() => handleConnectNewService('Cohere')}
                        className={`p-3 rounded-md border flex items-center cursor-pointer ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border hover:border-blue-500' 
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                          isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                        }`}>
                          <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>C</span>
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Cohere</div>
                          <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Connect to use Cohere's models</div>
                        </div>
                      </div>
                      
                      <div
                        onClick={() => handleConnectNewService('Hugging Face')}
                        className={`p-3 rounded-md border flex items-center cursor-pointer ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border hover:border-blue-500' 
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                          isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
                        }`}>
                          <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>H</span>
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Hugging Face</div>
                          <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Connect to Hugging Face models</div>
                        </div>
                      </div>
                      
                      <div
                        onClick={() => handleConnectNewService('Google AI')}
                        className={`p-3 rounded-md border flex items-center cursor-pointer ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border hover:border-blue-500' 
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                          isDark ? 'bg-green-900/30' : 'bg-green-100'
                        }`}>
                          <span className={`font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>G</span>
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Google AI</div>
                          <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Connect to Gemini models</div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowConnectServiceModal(false)}
                      className={`w-full p-2 rounded-md text-center ${
                        isDark 
                          ? 'bg-dark-bg border border-dark-border text-dark-text hover:bg-dark-bg/70' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeSection !== 'appearance' && activeSection !== 'api' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isDark ? 'bg-dark-bg' : 'bg-gray-100'
              }`}>
                <HelpCircle className={`h-8 w-8 ${isDark ? 'text-dark-text-secondary' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings
              </h3>
              <p className={`text-center max-w-md ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                This section is under development. Please check back later for updates or contact support for assistance.
              </p>
              <button 
                onClick={() => alert(`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} settings will be available soon!`)}
                className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                  isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Notify Me When Available
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;