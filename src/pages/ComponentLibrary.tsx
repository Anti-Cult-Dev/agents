import React, { useState } from 'react';
import { Search, Plus, Filter, BookOpen, Grid, List, ChevronDown, AlertCircle, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ComponentLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddSuccess, setShowAddSuccess] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    recent: true,
    popular: false,
    official: true
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'input', name: 'Input Components' },
    { id: 'process', name: 'Processing Components' },
    { id: 'database', name: 'Database Components' },
    { id: 'output', name: 'Output Components' },
    { id: 'integration', name: 'Integrations' },
  ];
  
  const components: Array<{
    id: number;
    name: string;
    category: string;
    description: string;
    usage: number;
  }> = [];
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddComponent = (id: number) => {
    setShowAddSuccess(id);
    alert(`Component with ID ${id} added to your project!`);
    setTimeout(() => setShowAddSuccess(null), 2000);
  };
  
  const handleCreateComponent = () => {
    // This would typically open a modal or navigate to a component creation page
    alert('Create new component feature coming soon!');
  };

  const handleFilterChange = (option: keyof typeof filterOptions) => {
    setFilterOptions({
      ...filterOptions,
      [option]: !filterOptions[option]
    });
  };

  const handleResetFilters = () => {
    setFilterOptions({
      recent: true,
      popular: false,
      official: true
    });
  };

  const handleViewComponentDocs = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Component documentation will be available soon!");
  };
  
  const filteredComponents = components
    .filter(c => activeCategory === 'all' ? true : c.category === activeCategory)
    .filter(c => searchQuery ? 
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       c.description.toLowerCase().includes(searchQuery.toLowerCase())) : true);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Component Library</h1>
          <p className="text-gray-500">Browse and add components to your agent workflows</p>
        </div>
        <button 
          onClick={handleCreateComponent}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Component</span>
        </button>
      </div>
      
      <div className={`rounded-lg border shadow-sm p-6 flex-1 flex flex-col ${
        isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex-1 min-w-[280px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-dark-bg border-dark-border text-dark-text' 
                    : 'border-gray-300 text-gray-700'
                }`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-400'
              }`} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5"
                >
                  <X className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-400'}`} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  isDark 
                    ? 'bg-dark-bg border border-dark-border hover:bg-dark-bg/70' 
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}>
                <Filter className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Filters</span>
                <ChevronDown className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
              </button>
              
              {showFilters && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 border ${
                  isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
                }`}>
                  <div className="px-4 py-2">
                    <h4 className={`text-xs font-semibold mb-2 ${
                      isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                    }`}>FILTER OPTIONS</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filterOptions.recent}
                          onChange={() => handleFilterChange('recent')}
                          className={`mr-2 ${
                            isDark ? 'border-dark-border' : 'border-gray-300'
                          }`}
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-dark-text' : 'text-gray-700'
                        }`}>Recent first</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filterOptions.popular}
                          onChange={() => handleFilterChange('popular')}
                          className={`mr-2 ${
                            isDark ? 'border-dark-border' : 'border-gray-300'
                          }`}
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-dark-text' : 'text-gray-700'
                        }`}>Most popular</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filterOptions.official}
                          onChange={() => handleFilterChange('official')}
                          className={`mr-2 ${
                            isDark ? 'border-dark-border' : 'border-gray-300'
                          }`}
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-dark-text' : 'text-gray-700'
                        }`}>Official only</span>
                      </label>
                    </div>
                    
                    <div className="pt-2 mt-2 border-t flex justify-between items-center">
                      <button 
                        onClick={handleResetFilters}
                        className={`text-xs ${
                          isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                        }`}
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => setShowFilters(false)}
                        className={`text-xs font-medium ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`flex border rounded-md overflow-hidden ${
              isDark ? 'border-dark-border' : 'border-gray-300'
            }`}>
              <button 
                className={`p-2 ${
                  viewMode === 'grid' 
                    ? isDark 
                      ? 'bg-dark-bg text-blue-400' 
                      : 'bg-blue-50 text-blue-600' 
                    : isDark 
                      ? 'bg-dark-surface text-dark-text-secondary hover:text-dark-text hover:bg-dark-bg/70' 
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 ${
                  viewMode === 'list' 
                    ? isDark 
                      ? 'bg-dark-bg text-blue-400' 
                      : 'bg-blue-50 text-blue-600' 
                    : isDark 
                      ? 'bg-dark-surface text-dark-text-secondary hover:text-dark-text hover:bg-dark-bg/70' 
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 flex-1 overflow-hidden">
          <div className="w-48 overflow-y-auto pr-2">
            <h3 className={`font-medium text-sm mb-2 ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
            }`}>CATEGORIES</h3>
            <ul className="space-y-1">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === category.id 
                        ? isDark 
                          ? 'bg-dark-bg text-blue-400 font-medium' 
                          : 'bg-blue-50 text-blue-600 font-medium' 
                        : isDark 
                          ? 'text-dark-text hover:bg-dark-bg' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h3 className={`font-medium text-sm mb-2 ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>DOCUMENTATION</h3>
              <a 
                href="#" 
                onClick={handleViewComponentDocs}
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  isDark 
                    ? 'text-blue-400 hover:bg-dark-bg' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Component Docs</span>
              </a>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-4 ${isDark ? 'bg-dark-bg animate-pulse' : 'bg-gray-100 animate-pulse'}`}
                    style={{ height: "120px" }}
                  ></div>
                ))}
              </div>
            ) : (
              <>
                {filteredComponents.length === 0 ? (
                  <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                  }`}>
                    <AlertCircle className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No components found</h3>
                    <p>
                      {searchQuery 
                        ? "Try adjusting your search or filter criteria" 
                        : "Components you create will appear here"}
                    </p>
                    <button 
                      onClick={handleCreateComponent}
                      className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                        isDark
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Create Your First Component
                    </button>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredComponents.map(component => (
                      <div 
                        key={component.id} 
                        className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border hover:border-blue-500' 
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>{component.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDark 
                              ? 'bg-blue-900/30 text-blue-300'
                              : 'bg-blue-100 text-blue-800'
                          }`}>{component.category}</span>
                        </div>
                        <p className={`text-sm mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-600'}`}>{component.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Used {component.usage} times</span>
                          <button 
                            onClick={() => handleAddComponent(component.id)}
                            className={`text-sm font-medium ${
                              showAddSuccess === component.id
                                ? isDark 
                                  ? 'text-emerald-400' 
                                  : 'text-emerald-600'
                                : isDark 
                                  ? 'text-blue-400 hover:text-blue-300'
                                  : 'text-blue-600 hover:text-blue-800'
                            }`}
                          >
                            {showAddSuccess === component.id ? (
                              <span className="flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Added!
                              </span>
                            ) : 'Add'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`border rounded-lg overflow-hidden ${
                    isDark ? 'border-dark-border' : 'border-gray-200'
                  }`}>
                    <table className={`min-w-full divide-y ${isDark ? 'divide-dark-border' : 'divide-gray-200'}`}>
                      <thead className={isDark ? 'bg-dark-bg' : 'bg-gray-50'}>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                          }`}>Name</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                          }`}>Category</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                          }`}>Description</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                          }`}>Usage</th>
                          <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                            isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                          }`}>Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-dark-border' : 'divide-gray-200'}`}>
                        {filteredComponents.map(component => (
                          <tr 
                            key={component.id} 
                            className={isDark ? 'bg-dark-bg hover:bg-dark-bg/70' : 'bg-white hover:bg-gray-50'}
                          >
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                              isDark ? 'text-dark-text' : 'text-gray-800'
                            }`}>{component.name}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                            }`}>{component.category}</td>
                            <td className={`px-6 py-4 text-sm ${
                              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                            }`}>{component.description}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                            }`}>{component.usage}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button
                                onClick={() => handleAddComponent(component.id)}
                                className={`font-medium ${
                                  showAddSuccess === component.id
                                    ? isDark 
                                      ? 'text-emerald-400' 
                                      : 'text-emerald-600'
                                    : isDark 
                                      ? 'text-blue-400 hover:text-blue-300'
                                      : 'text-blue-600 hover:text-blue-800'
                                }`}
                              >
                                {showAddSuccess === component.id ? (
                                  <span className="flex items-center">
                                    <Check className="h-3 w-3 mr-1" />
                                    Added!
                                  </span>
                                ) : 'Add'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;