import React from 'react';
import { MoreVertical, Bot, AlertCircle, PlayCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

interface AgentProps {
  agent: {
    id: number;
    name: string;
    status: string;
    type: string;
    lastEdited: string;
  };
}

const AgentCard: React.FC<AgentProps> = ({ agent }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showDropdown, setShowDropdown] = React.useState(false);

  const getStatusColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'active':
          return 'bg-emerald-900/30 text-emerald-300';
        case 'draft':
          return 'bg-amber-900/30 text-amber-300';
        case 'inactive':
          return 'bg-gray-800 text-gray-300';
        default:
          return 'bg-gray-800 text-gray-300';
      }
    } else {
      switch (status) {
        case 'active':
          return 'bg-emerald-100 text-emerald-800';
        case 'draft':
          return 'bg-amber-100 text-amber-800';
        case 'inactive':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Support':
        return <Bot className="h-10 w-10 text-blue-500" />;
      case 'Analysis':
        return <Bot className="h-10 w-10 text-purple-500" />;
      case 'Creative':
        return <Bot className="h-10 w-10 text-pink-500" />;
      case 'Sales':
        return <Bot className="h-10 w-10 text-emerald-500" />;
      default:
        return <Bot className="h-10 w-10 text-gray-500" />;
    }
  };

  const getStatusBarColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'active':
          return 'bg-emerald-500';
        case 'draft':
          return 'bg-amber-500';
        default:
          return 'bg-gray-600';
      }
    } else {
      switch (status) {
        case 'active':
          return 'bg-emerald-500';
        case 'draft':
          return 'bg-amber-500';
        default:
          return 'bg-gray-300';
      }
    }
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleEditClick = () => {
    alert(`Editing agent: ${agent.name}`);
  };

  return (
    <div className={`border rounded-lg transition-shadow duration-200 overflow-hidden group ${
      isDark 
        ? 'bg-dark-surface border-dark-border hover:shadow-md shadow-black/20' 
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-dark-bg' : 'bg-blue-50'
          }`}>
            {getTypeIcon(agent.type)}
          </div>
          <div className="dropdown relative">
            <button 
              className={isDark ? "text-dark-text-secondary hover:text-dark-text" : "text-gray-400 hover:text-gray-600"}
              onClick={handleMoreClick}
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {showDropdown && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ${
                isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'
              }`}>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setShowDropdown(false);
                    alert(`View details for: ${agent.name}`);
                  }}
                >
                  View Details
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setShowDropdown(false);
                    handleEditClick();
                  }}
                >
                  Edit
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-red-400 hover:bg-dark-bg' : 'text-red-600 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setShowDropdown(false);
                    alert(`Delete agent: ${agent.name}`);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <h3 className={`font-semibold mb-1 truncate ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>{agent.name}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(agent.status)}`}>
            {agent.status}
          </span>
          <span className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Edited {agent.lastEdited}</span>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            className={`text-xs flex items-center ${
              isDark 
                ? 'text-dark-text-secondary hover:text-blue-400' 
                : 'text-gray-600 hover:text-blue-600'
            } transition-colors`}
            onClick={() => alert(`Viewing details for: ${agent.name}`)}
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Details</span>
          </button>
          <button 
            className={`text-xs flex items-center font-medium ${
              isDark 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            } transition-colors`}
            onClick={() => agent.status === 'active' 
              ? alert(`Opening agent: ${agent.name}`) 
              : handleEditClick()
            }
          >
            <PlayCircle className="h-4 w-4 mr-1" />
            <span>{agent.status === 'active' ? 'Open' : 'Edit'}</span>
          </button>
        </div>
      </div>
      
      <div className={`h-1.5 w-full ${
        isDark 
          ? 'bg-dark-bg group-hover:bg-dark-border' 
          : 'bg-gray-100 group-hover:bg-blue-100'
      } transition-colors`}>
        <div className={`h-full ${getStatusBarColor(agent.status)}`} 
             style={{ width: agent.status === 'active' ? '100%' : agent.status === 'draft' ? '60%' : '30%' }} />
      </div>
    </div>
  );
};

export default AgentCard;