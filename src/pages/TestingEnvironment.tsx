import React, { useState, useRef, useEffect } from 'react';
import { Play, AlertTriangle, CheckCircle, XCircle, RefreshCw, Maximize2, Download, Terminal, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TestingEnvironment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isRunning, setIsRunning] = useState(false);
  const [testMessages, setTestMessages] = useState<Array<{role: string, content: string}>>([
    { role: 'system', content: 'Testing initialized. Agent is ready for interaction.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    scrollToBottom();
  }, [testMessages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleStartTest = () => {
    setIsRunning(true);
    
    // Add initial system message if empty
    if (testMessages.length === 0) {
      setTestMessages([
        { role: 'system', content: 'Testing initialized. Agent is ready for interaction.' }
      ]);
    }
  };
  
  const handleStopTest = () => {
    setIsRunning(false);
    alert("Test session stopped");
  };
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the test? All messages will be cleared.')) {
      setTestMessages([
        { role: 'system', content: 'Testing initialized. Agent is ready for interaction.' }
      ]);
      setIsRunning(false);
    }
  };
  
  const handleDownloadResults = () => {
    if (testMessages.length <= 1) {
      alert("No test results to download yet");
      return;
    }
    
    setIsDownloading(true);
    
    // Create text content from messages
    const content = testMessages
      .map(msg => `[${msg.role.toUpperCase()}]: ${msg.content}`)
      .join('\n\n');
    
    // Create a blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agent-test-results.txt';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 1000);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !isRunning) return;
    
    setTestMessages([...testMessages, { role: 'user', content: userInput }]);
    setUserInput('');
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      setTestMessages(messages => [
        ...messages, 
        { 
          role: 'assistant', 
          content: 'I understand your request and I\'m ready to assist. However, since I\'m in test mode, I\'m not connected to a real agent yet. Once you connect the backend, I\'ll provide real responses here.' 
        }
      ]);
    }, 1000);
  };
  
  const handleExpandResults = () => {
    alert("Expanded view of test results coming soon!");
  };

  const handleDebugModeToggle = () => {
    alert("Debug mode toggle functionality will be implemented with the backend");
  };

  const handleRecordTestToggle = () => {
    alert("Record test session functionality will be implemented with the backend");
  };
  
  // Empty test results array
  const testResults: Array<{name: string, status: string, score: string}> = [];
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Testing Environment</h1>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Test your agent's behavior before deployment</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isRunning ? (
            <button 
              onClick={handleStartTest}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Start Test</span>
            </button>
          ) : (
            <button 
              onClick={handleStopTest}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <XCircle className="h-5 w-5" />
              <span>Stop Test</span>
            </button>
          )}
          <button 
            onClick={handleReset}
            className={`p-2 rounded-md transition-colors ${
              isDark 
                ? 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-bg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            title="Reset test"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className={`lg:col-span-2 flex flex-col rounded-lg border overflow-hidden ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className={`border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <div className="flex">
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'chat' 
                    ? isDark 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-blue-600 border-b-2 border-blue-600' 
                    : isDark 
                      ? 'text-dark-text-secondary hover:text-dark-text' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat Interface</span>
                </div>
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'terminal' 
                    ? isDark 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-blue-600 border-b-2 border-blue-600' 
                    : isDark 
                      ? 'text-dark-text-secondary hover:text-dark-text' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('terminal')}
              >
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4" />
                  <span>Terminal</span>
                </div>
              </button>
            </div>
          </div>
          
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col">
              <div className={`flex-1 p-4 overflow-y-auto ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {testMessages.length > 0 ? (
                  testMessages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 max-w-[80%] ${
                        message.role === 'user' 
                          ? `ml-auto ${isDark ? 'bg-blue-600' : 'bg-blue-600'} text-white` 
                          : message.role === 'system' 
                            ? `mx-auto ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}` 
                            : `${isDark ? 'bg-dark-surface border border-dark-border text-dark-text' : 'bg-white border border-gray-200 text-gray-800'}`
                      } rounded-lg p-3 shadow-sm`}
                    >
                      {message.content}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className={`h-16 w-16 mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-300'} opacity-50`} />
                    <p className={`${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Start a test to begin interacting with your agent</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className={`p-4 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={`flex-1 p-2 border rounded-md ${
                      isDark 
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:ring-1 focus:ring-blue-500 focus:border-blue-500' 
                        : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Type your test message..."
                    disabled={!isRunning}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                      !isRunning || !userInput.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isRunning || !userInput.trim()}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {activeTab === 'terminal' && (
            <div className={`flex-1 p-4 font-mono text-sm overflow-y-auto ${
              isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-900 text-gray-100'
            }`}>
              <p className="text-green-400">$ agent-test init</p>
              <p className="text-gray-300 mb-2">[INFO] Initializing test environment for agent...</p>
              <p className="text-gray-300 mb-2">[INFO] No agent workflow found. Please create a workflow first.</p>
              <p className="animate-pulse text-gray-500">_</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-6">
          <div className={`rounded-lg border p-6 ${
            isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-semibold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Test Results</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleExpandResults}
                  className={isDark ? "p-1 text-dark-text-secondary hover:text-dark-text" : "p-1 text-gray-500 hover:text-gray-700"}
                  title="Expand results"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleDownloadResults}
                  className={isDark ? "p-1 text-dark-text-secondary hover:text-dark-text" : "p-1 text-gray-500 hover:text-gray-700"}
                  title="Download results"
                  disabled={isDownloading || testMessages.length <= 1}
                >
                  {isDownloading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent inline-block"></span>
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {testResults.length > 0 ? (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 border rounded-md ${
                      isDark 
                        ? 'border-dark-border hover:bg-dark-bg' 
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {result.status === 'pass' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                      {result.status === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                      {result.status === 'fail' && <XCircle className="h-5 w-5 text-red-500" />}
                      <span className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>{result.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      result.status === 'pass' 
                        ? isDark ? 'text-emerald-400' : 'text-emerald-600' 
                        : result.status === 'warning' 
                          ? isDark ? 'text-amber-400' : 'text-amber-600' 
                          : isDark ? 'text-red-400' : 'text-red-600'
                    }`}>{result.score}</span>
                  </div>
                ))}
                
                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-dark-border' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? "text-sm text-dark-text-secondary" : "text-sm text-gray-500"}>Overall Score</span>
                    <span className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>--</span>
                  </div>
                  <div className={`w-full rounded-full h-2.5 mt-2 ${isDark ? 'bg-dark-bg' : 'bg-gray-200'}`}>
                    <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center py-8 text-center ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>
                <AlertTriangle className="h-12 w-12 mb-3 opacity-50" />
                <p className="font-medium">No test results available</p>
                <p className="text-sm mt-1">
                  Start the test and interact with your agent to see results
                </p>
              </div>
            )}
          </div>
          
          <div className={`rounded-lg border p-6 ${
            isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className={`font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Test Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                }`}>Test Mode</label>
                <select 
                  className={`w-full p-2 border rounded-md ${
                    isDark 
                      ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  onChange={(e) => alert(`Test mode changed to: ${e.target.value}`)}
                >
                  <option>Interactive</option>
                  <option>Automated</option>
                  <option>Batch</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                }`}>Model Version</label>
                <select 
                  className={`w-full p-2 border rounded-md ${
                    isDark 
                      ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  onChange={(e) => alert(`Model version changed to: ${e.target.value}`)}
                >
                  <option>Production (v1.0.0)</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="debugMode" 
                  className={`h-4 w-4 rounded ${
                    isDark 
                      ? 'bg-dark-bg border-dark-border text-blue-600 focus:ring-blue-500' 
                      : 'border-gray-300 text-blue-600 focus:ring-blue-500'
                  }`}
                  onChange={handleDebugModeToggle}
                />
                <label htmlFor="debugMode" className={`ml-2 block text-sm ${
                  isDark ? 'text-dark-text' : 'text-gray-700'
                }`}>
                  Debug Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="recordTest" 
                  className={`h-4 w-4 rounded ${
                    isDark 
                      ? 'bg-dark-bg border-dark-border text-blue-600 focus:ring-blue-500' 
                      : 'border-gray-300 text-blue-600 focus:ring-blue-500'
                  }`}
                  onChange={handleRecordTestToggle}
                />
                <label htmlFor="recordTest" className={`ml-2 block text-sm ${
                  isDark ? 'text-dark-text' : 'text-gray-700'
                }`}>
                  Record Test Session
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingEnvironment;