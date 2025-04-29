import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart as FlowChart, 
  Layers, 
  TestTube, 
  FileText, 
  Plus, 
  Bot, 
  ChevronLeft, 
  ChevronRight,
  Settings
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const handleNewAgent = () => {
    // Navigate to workflow editor or open a modal for new agent
    alert("Creating a new agent...");
    navigate('/workflow-editor');
  };
  
  return (
    <aside className={`text-white transition-all duration-300 ease-in-out ${
      collapsed ? 'w-16' : 'w-64'
    } ${
      isDark ? 'bg-dark-surface border-r border-dark-border' : 'bg-blue-600'
    }`}>
      <div className="h-full flex flex-col">
        <div className={`flex items-center justify-between h-16 px-4 ${
          isDark ? 'border-b border-dark-border' : 'border-b border-blue-700'
        }`}>
          <div className={`flex items-center space-x-2 ${collapsed ? 'justify-center w-full' : ''}`}>
            <Bot className="h-8 w-8 text-white" />
            {!collapsed && <span className="text-xl font-bold">AgentCraft</span>}
          </div>
          <button 
            onClick={toggleSidebar}
            className={`p-1 rounded-md transition-colors ${
              isDark 
                ? 'hover:bg-dark-bg' 
                : 'hover:bg-blue-700'
            } ${collapsed ? 'hidden' : 'block'}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleSidebar}
            className={`p-1 rounded-md transition-colors absolute -right-3 top-7 rounded-full shadow-md ${
              isDark 
                ? 'bg-dark-surface hover:bg-dark-bg' 
                : 'bg-blue-600 hover:bg-blue-700'
            } ${collapsed ? 'block' : 'hidden'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/workflow-editor" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <FlowChart className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Workflow Editor</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/component-library" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Layers className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Component Library</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/testing" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <TestTube className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Testing Environment</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/documentation" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <FileText className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Documentation</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({isActive}) => 
                  `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    isActive 
                      ? isDark
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-700 text-white' 
                      : isDark
                        ? 'text-dark-text hover:bg-dark-bg hover:text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className={`p-4 ${isDark ? 'border-t border-dark-border' : 'border-t border-blue-700'}`}>
          <button 
            onClick={handleNewAgent}
            className={`w-full p-2 font-medium rounded-md transition-colors flex items-center ${
              isDark 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
            } ${collapsed ? 'justify-center' : 'space-x-2'}`}>
            <Plus className="h-5 w-5" />
            {!collapsed && <span>New Agent</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;