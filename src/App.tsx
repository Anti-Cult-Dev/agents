import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import WorkflowEditor from './pages/WorkflowEditor';
import ComponentLibrary from './pages/ComponentLibrary';
import TestingEnvironment from './pages/TestingEnvironment';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  
  return (
    <Router>
      <div className={`flex h-screen ${theme === 'dark' ? 'dark bg-dark-bg text-dark-text' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workflow-editor" element={<WorkflowEditor />} />
              <Route path="/component-library" element={<ComponentLibrary />} />
              <Route path="/testing" element={<TestingEnvironment />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;