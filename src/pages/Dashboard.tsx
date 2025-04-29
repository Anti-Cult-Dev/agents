import React, { useState } from 'react';
import { PlusCircle, Zap, Users, Clock, ArrowUpRight, Bot, ExternalLink, Info } from 'lucide-react';
import AgentCard from '../components/dashboard/AgentCard';
import StatCard from '../components/dashboard/StatCard';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [agents, setAgents] = useState<Array<{id: number, name: string, status: string, type: string, lastEdited: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState<string | null>(null);

  const handleCreateAgent = () => {
    // Create a sample agent for demonstration
    const newAgent = {
      id: Date.now(),
      name: `New Agent ${agents.length + 1}`,
      status: 'draft',
      type: 'Support',
      lastEdited: 'just now'
    };
    
    setAgents([...agents, newAgent]);
  };

  const handleShowMoreInfo = (insight: string) => {
    setShowInfoPopup(showInfoPopup === insight ? null : insight);
  };

  const handleViewAllAgents = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Full agents list view will be available soon");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Dashboard</h1>
        <button 
          onClick={handleCreateAgent}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>
          <PlusCircle className="h-5 w-5" />
          <span>Create New Agent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Agents" 
          value={agents.filter(a => a.status === 'active').length.toString()} 
          trend="--" 
          icon={<Zap className="h-5 w-5 text-yellow-500" />} 
          color={isDark ? "bg-dark-bg" : "bg-yellow-100"}
        />
        <StatCard 
          title="Total Interactions" 
          value="0" 
          trend="--" 
          icon={<ArrowUpRight className="h-5 w-5 text-emerald-500" />} 
          color={isDark ? "bg-dark-bg" : "bg-emerald-100"}
        />
        <StatCard 
          title="Unique Users" 
          value="0" 
          trend="--" 
          icon={<Users className="h-5 w-5 text-blue-500" />} 
          color={isDark ? "bg-dark-bg" : "bg-blue-100"}
        />
        <StatCard 
          title="Avg. Response Time" 
          value="--" 
          trend="--" 
          icon={<Clock className="h-5 w-5 text-purple-500" />} 
          color={isDark ? "bg-dark-bg" : "bg-purple-100"}
        />
      </div>

      <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-dark-surface' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Your Agents</h2>
          <a 
            href="#" 
            onClick={handleViewAllAgents}
            className={`text-sm font-medium flex items-center space-x-1 ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <span>View All</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-5 ${
                  isDark ? 'bg-dark-bg animate-pulse' : 'bg-gray-100 animate-pulse'
                }`}
                style={{ height: "200px" }}
              ></div>
            ))}
          </div>
        ) : agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            
            <div 
              onClick={handleCreateAgent}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer h-full min-h-[200px] transition-colors ${
                isDark 
                  ? 'border-dark-border text-dark-text-secondary hover:text-blue-400 hover:border-blue-500' 
                  : 'border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              <PlusCircle className="h-10 w-10 mb-2" />
              <p className="text-center font-medium">Create New Agent</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div 
              onClick={handleCreateAgent}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer h-full min-h-[200px] transition-colors ${
                isDark 
                  ? 'border-dark-border text-dark-text-secondary hover:text-blue-400 hover:border-blue-500' 
                  : 'border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              <PlusCircle className="h-10 w-10 mb-2" />
              <p className="text-center font-medium">Create New Agent</p>
            </div>

            <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-full min-h-[200px] transition-colors ${
              isDark 
                ? 'border-dark-border text-dark-text-secondary' 
                : 'border-gray-200 text-gray-400'
            }`}>
              <Bot className="h-10 w-10 mb-2" />
              <p className="text-center font-medium">No agents yet</p>
              <p className={`text-center text-xs mt-2 ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>Create your first agent to get started</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-dark-surface' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Recent Activity</h2>
          {agents.length > 0 ? (
            <div className="space-y-4">
              <div className={`flex items-start py-3 ${
                isDark ? 'border-b border-dark-border' : 'border-b border-gray-100'
              }`}>
                <div className={`h-9 w-9 rounded-full mr-3 flex items-center justify-center ${
                  isDark ? 'bg-dark-bg' : 'bg-blue-100'
                }`}>
                  <Bot className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                    New agent "{agents[agents.length - 1].name}" was created
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>just now</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center py-6 ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
            }`}>
              <Clock className="h-12 w-12 mb-3 opacity-50" />
              <p className="text-center font-medium">No recent activity</p>
              <p className="text-center text-sm mt-1">Activity will appear here once you create and use agents</p>
            </div>
          )}
        </div>
        
        <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-dark-surface' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Quick Insights</h2>
          <div className="space-y-4">
            <div className={`rounded-lg p-4 border relative ${
              isDark 
                ? 'bg-blue-900/20 border-blue-900/30' 
                : 'bg-blue-50 border-blue-100'
            }`}>
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>Getting Started</h3>
                <button 
                  onClick={() => handleShowMoreInfo('getting-started')}
                  className={isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-900'}
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <p className={`text-xs ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
                Create your first agent by clicking the "Create New Agent" button above.
              </p>
              {showInfoPopup === 'getting-started' && (
                <div className={`absolute top-full mt-2 left-0 right-0 z-10 p-3 rounded-md shadow-lg ${
                  isDark ? 'bg-dark-surface border border-dark-border text-dark-text-secondary' : 'bg-white border border-gray-200 text-gray-600'
                }`}>
                  <p className="text-xs">
                    Click on "Create New Agent" to start building your first AI agent. 
                    You can then customize it in the Workflow Editor to define its behavior.
                  </p>
                </div>
              )}
            </div>
            
            <div className={`rounded-lg p-4 border relative ${
              isDark 
                ? 'bg-purple-900/20 border-purple-900/30' 
                : 'bg-purple-50 border-purple-100'
            }`}>
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>Documentation</h3>
                <button 
                  onClick={() => handleShowMoreInfo('documentation')}
                  className={isDark ? 'text-purple-300 hover:text-purple-200' : 'text-purple-700 hover:text-purple-900'}
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>
                Check out the documentation to learn how to create and configure your agents.
              </p>
              
              {showInfoPopup === 'documentation' && (
                <div className={`absolute top-full mt-2 left-0 right-0 z-10 p-3 rounded-md shadow-lg ${
                  isDark ? 'bg-dark-surface border border-dark-border text-dark-text-secondary' : 'bg-white border border-gray-200 text-gray-600'
                }`}>
                  <p className="text-xs">
                    Our comprehensive documentation includes step-by-step guides, API references, 
                    and best practices for building effective agents.
                  </p>
                  <div className="mt-2">
                    <Link 
                      to="/documentation" 
                      className={`text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      View Documentation
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`rounded-lg p-4 border relative ${
              isDark 
                ? 'bg-emerald-900/20 border-emerald-900/30' 
                : 'bg-emerald-50 border-emerald-100'
            }`}>
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>Need Help?</h3>
                <button 
                  onClick={() => handleShowMoreInfo('help')}
                  className={isDark ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-900'}
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <p className={`text-xs ${isDark ? 'text-emerald-200' : 'text-emerald-700'}`}>
                Visit our help center or contact support if you need assistance getting started.
              </p>
              
              {showInfoPopup === 'help' && (
                <div className={`absolute top-full mt-2 left-0 right-0 z-10 p-3 rounded-md shadow-lg ${
                  isDark ? 'bg-dark-surface border border-dark-border text-dark-text-secondary' : 'bg-white border border-gray-200 text-gray-600'
                }`}>
                  <p className="text-xs">
                    Our support team is available 24/7 to help you with any questions or issues.
                  </p>
                  <div className="mt-2 space-x-3">
                    <button 
                      className={`text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                      onClick={() => alert("Support contact feature coming soon!")}
                    >
                      Contact Support
                    </button>
                    <button 
                      className={`text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                      onClick={() => alert("FAQs will be available soon!")}
                    >
                      View FAQs
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;