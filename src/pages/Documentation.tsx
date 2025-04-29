import React, { useState } from 'react';
import { FileText, Download, Clipboard, Check, Edit, Eye, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const copyToClipboard = () => {
    // Get the content based on active section
    let contentToCopy = '';
    switch (activeSection) {
      case 'overview':
        contentToCopy = 'Data Analysis Agent - An intelligent agent designed to process, analyze, and visualize complex datasets.';
        break;
      case 'architecture':
        contentToCopy = 'The Data Analysis Agent follows a modular architecture designed for flexibility and extensibility.';
        break;
      case 'components':
        contentToCopy = 'The Data Analysis Agent is composed of various components that can be configured and extended.';
        break;
      case 'api':
        contentToCopy = 'The Data Analysis Agent exposes several APIs for integration into your applications.';
        break;
      case 'deployment':
        contentToCopy = 'This section covers how to deploy and manage your Data Analysis Agent.';
        break;
      default:
        contentToCopy = 'Data Analysis Agent Documentation';
    }
    
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  const handleExport = (format: string) => {
    alert(`Documentation will be exported in ${format} format. This feature is coming soon!`);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Documentation</h1>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Auto-generated documentation and PRD for your agent</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${
              isDark 
                ? 'border-dark-border bg-dark-bg hover:bg-dark-bg/70 text-dark-text' 
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}>
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
            <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 z-10 hidden group-hover:block ${
              isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'
            }`}>
              <button 
                onClick={() => handleExport('pdf')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Export as PDF
              </button>
              <button 
                onClick={() => handleExport('markdown')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Export as Markdown
              </button>
              <button 
                onClick={() => handleExport('html')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Export as HTML
              </button>
            </div>
          </div>
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {previewMode ? (
              <>
                <Edit className="h-5 w-5" />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Eye className="h-5 w-5" />
                <span>Preview</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className={`lg:col-span-1 rounded-lg border p-4 ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h2 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Documentation Sections</h2>
          <nav className="space-y-1">
            <button 
              className={`w-full flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
                activeSection === 'overview' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('overview')}
            >
              <BookOpen className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
                activeSection === 'architecture' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('architecture')}
            >
              <FileText className="h-4 w-4" />
              <span>Architecture</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
                activeSection === 'components' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('components')}
            >
              <FileText className="h-4 w-4" />
              <span>Components</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
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
              <FileText className="h-4 w-4" />
              <span>API Reference</span>
            </button>
            <button 
              className={`w-full flex items-center space-x-2 p-2 rounded-md text-left transition-colors ${
                activeSection === 'deployment' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'text-dark-text hover:bg-dark-bg' 
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('deployment')}
            >
              <FileText className="h-4 w-4" />
              <span>Deployment</span>
            </button>
          </nav>
          
          <div className="mt-8">
            <h2 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Generated Files</h2>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded-md ${
                isDark ? 'hover:bg-dark-bg' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center space-x-2">
                  <FileText className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Product-Requirements.md</span>
                </div>
                <button className={isDark ? "text-dark-text-secondary hover:text-dark-text" : "text-gray-500 hover:text-gray-700"}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
              <div className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded-md ${
                isDark ? 'hover:bg-dark-bg' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center space-x-2">
                  <FileText className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Technical-Spec.md</span>
                </div>
                <button className={isDark ? "text-dark-text-secondary hover:text-dark-text" : "text-gray-500 hover:text-gray-700"}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
              <div className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded-md ${
                isDark ? 'hover:bg-dark-bg' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center space-x-2">
                  <FileText className={`h-4 w-4 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>User-Guide.md</span>
                </div>
                <button className={isDark ? "text-dark-text-secondary hover:text-dark-text" : "text-gray-500 hover:text-gray-700"}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`lg:col-span-3 rounded-lg border overflow-hidden flex flex-col ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className={`border-b p-4 flex justify-between items-center ${
            isDark ? 'border-dark-border' : 'border-gray-200'
          }`}>
            <h2 className={`font-semibold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
              {activeSection === 'overview' && 'Overview'}
              {activeSection === 'architecture' && 'Architecture'}
              {activeSection === 'components' && 'Components'}
              {activeSection === 'api' && 'API Reference'}
              {activeSection === 'deployment' && 'Deployment'}
            </h2>
            <button 
              onClick={copyToClipboard}
              className={`flex items-center space-x-1 text-sm ${
                isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className={`flex-1 overflow-y-auto p-6 ${
            isDark ? 'bg-dark-bg' : 'bg-white'
          }`}>
            {previewMode ? (
              // Read mode
              <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                {activeSection === 'overview' && (
                  <div>
                    <h1>Data Analysis Agent</h1>
                    <p className="lead">An intelligent agent designed to process, analyze, and visualize complex datasets.</p>
                    
                    <h2>Purpose</h2>
                    <p>This agent is designed to assist data analysts and business intelligence teams in quickly deriving insights from raw data. It can handle various data formats, perform statistical analysis, and generate visualizations and reports.</p>
                    
                    <h2>Key Features</h2>
                    <ul>
                      <li><strong>Data Ingestion:</strong> Support for CSV, JSON, Excel, and SQL databases</li>
                      <li><strong>Data Cleaning:</strong> Automated handling of missing values, outliers, and inconsistent formatting</li>
                      <li><strong>Statistical Analysis:</strong> Descriptive statistics, correlation analysis, regression, and hypothesis testing</li>
                      <li><strong>Visualization:</strong> Automated chart generation based on data characteristics</li>
                      <li><strong>Natural Language Interface:</strong> Allow users to ask questions about their data in plain English</li>
                    </ul>
                    
                    <h2>Target Users</h2>
                    <p>This agent is designed for:</p>
                    <ul>
                      <li>Data analysts</li>
                      <li>Business intelligence teams</li>
                      <li>Product managers</li>
                      <li>Executives needing data insights</li>
                    </ul>
                    
                    <h2>Limitations</h2>
                    <p>The current version has the following limitations:</p>
                    <ul>
                      <li>Maximum dataset size of 100MB</li>
                      <li>Limited support for unstructured data</li>
                      <li>No real-time data processing capabilities</li>
                    </ul>
                    
                    <h2>Future Enhancements</h2>
                    <ul>
                      <li>Machine learning model recommendations</li>
                      <li>Advanced forecasting capabilities</li>
                      <li>Integration with BI tools</li>
                      <li>Support for larger datasets</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === 'architecture' && (
                  <div>
                    <h1>Architecture</h1>
                    <p>The Data Analysis Agent follows a modular architecture designed for flexibility and extensibility.</p>
                    
                    <h2>High-Level Architecture</h2>
                    <div className={`p-4 rounded-md mb-6 text-center ${
                      isDark ? 'bg-dark-surface' : 'bg-blue-50'
                    }`}>
                      [Architecture Diagram]
                    </div>
                    
                    <h2>Core Modules</h2>
                    
                    <h3>Input Handler</h3>
                    <p>Responsible for:</p>
                    <ul>
                      <li>Processing user requests</li>
                      <li>Parsing natural language queries</li>
                      <li>Validating input parameters</li>
                    </ul>
                    
                    <h3>Data Connector</h3>
                    <p>Handles connections to different data sources:</p>
                    <ul>
                      <li>File-based sources (CSV, Excel, JSON)</li>
                      <li>Database connections (SQL, NoSQL)</li>
                      <li>API integrations</li>
                    </ul>
                    
                    <h3>Analysis Engine</h3>
                    <p>Core analytical capabilities including:</p>
                    <ul>
                      <li>Statistical computations</li>
                      <li>Data transformation pipelines</li>
                      <li>Feature engineering</li>
                    </ul>
                    
                    <h3>Visualization Generator</h3>
                    <p>Creates visual representations of data:</p>
                    <ul>
                      <li>Chart selection based on data characteristics</li>
                      <li>Dynamic visualization rendering</li>
                      <li>Interactive elements for exploration</li>
                    </ul>
                    
                    <h3>Response Formatter</h3>
                    <p>Prepares analysis results for presentation:</p>
                    <ul>
                      <li>Natural language summaries</li>
                      <li>Structured data export</li>
                      <li>Report generation</li>
                    </ul>
                    
                    <h2>Data Flow</h2>
                    <ol>
                      <li>User submits query or uploads data</li>
                      <li>Input Handler processes and validates the request</li>
                      <li>Data Connector retrieves required data</li>
                      <li>Analysis Engine performs requested computations</li>
                      <li>Visualization Generator creates relevant charts</li>
                      <li>Response Formatter compiles results</li>
                      <li>Results returned to user</li>
                    </ol>
                  </div>
                )}
                
                {activeSection === 'components' && (
                  <div>
                    <h1>Components</h1>
                    <p>The Data Analysis Agent is composed of various components that can be configured and extended.</p>
                    
                    <h2>Input Components</h2>
                    
                    <h3>Text Input</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "input.text",
  "config": {
    "prompt": "What would you like to analyze?",
    "placeholder": "Enter your question about the data"
  }
}`}</code></pre>
                    </div>
                    
                    <h3>File Upload</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "input.file",
  "config": {
    "acceptedFormats": ["csv", "xlsx", "json"],
    "maxSize": "100MB"
  }
}`}</code></pre>
                    </div>
                    
                    <h2>Processing Components</h2>
                    
                    <h3>Data Cleaner</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "process.cleaner",
  "config": {
    "handleMissingValues": true,
    "removeOutliers": false,
    "standardizeColumns": true
  }
}`}</code></pre>
                    </div>
                    
                    <h3>Statistical Analyzer</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "process.statistics",
  "config": {
    "descriptiveStats": true,
    "correlationAnalysis": true,
    "significanceLevel": 0.05
  }
}`}</code></pre>
                    </div>
                    
                    <h2>Output Components</h2>
                    
                    <h3>Chart Generator</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "output.chart",
  "config": {
    "chartTypes": ["bar", "line", "scatter", "pie"],
    "colorScheme": "blue",
    "autoSelect": true
  }
}`}</code></pre>
                    </div>
                    
                    <h3>Report Generator</h3>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`{
  "type": "output.report",
  "config": {
    "format": "markdown",
    "includeExecutiveSummary": true,
    "includeMethodology": true
  }
}`}</code></pre>
                    </div>
                  </div>
                )}
                
                {activeSection === 'api' && (
                  <div>
                    <h1>API Reference</h1>
                    <p>The Data Analysis Agent exposes several APIs for integration into your applications.</p>
                    
                    <h2>REST API</h2>
                    
                    <h3>Authentication</h3>
                    <p>All API requests require an API key to be included in the header:</p>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`Authorization: Bearer {your_api_key}`}</code></pre>
                    </div>
                    
                    <h3>Endpoints</h3>
                    
                    <h4>Upload Dataset</h4>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`POST /api/datasets
Content-Type: multipart/form-data

{
  "file": [binary file content],
  "name": "sales_data_2023",
  "description": "Annual sales figures by region"
}`}</code></pre>
                    </div>
                    
                    <h4>Query Dataset</h4>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`POST /api/query
Content-Type: application/json

{
  "datasetId": "ds_123456",
  "query": "What were the top selling products in Q1?",
  "outputFormat": "json"
}`}</code></pre>
                    </div>
                    
                    <h4>Generate Visualization</h4>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`POST /api/visualize
Content-Type: application/json

{
  "datasetId": "ds_123456",
  "type": "bar",
  "xAxis": "product_name",
  "yAxis": "units_sold",
  "filters": [
    {"field": "quarter", "operator": "equals", "value": "Q1"}
  ]
}`}</code></pre>
                    </div>
                    
                    <h3>Webhook Integration</h3>
                    <p>You can configure webhooks to receive notifications when analysis is complete:</p>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`POST /api/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/data-analysis",
  "events": ["analysis.complete", "error.occurred"],
  "secret": "your_webhook_secret"
}`}</code></pre>
                    </div>
                    
                    <h2>JavaScript SDK</h2>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`import { DataAnalysisAgent } from '@agent-platform/data-analysis';

const agent = new DataAnalysisAgent({
  apiKey: 'your_api_key'
});

// Upload a dataset
const dataset = await agent.uploadDataset({
  file: fileObject,
  name: 'sales_data_2023'
});

// Query the dataset
const result = await agent.query({
  datasetId: dataset.id,
  query: 'Show me monthly sales trends'
});

// Generate a visualization
const chart = await agent.visualize({
  datasetId: dataset.id,
  type: 'line',
  xAxis: 'month',
  yAxis: 'total_sales'
});`}</code></pre>
                    </div>
                  </div>
                )}
                
                {activeSection === 'deployment' && (
                  <div>
                    <h1>Deployment Guide</h1>
                    <p>This section covers how to deploy and manage your Data Analysis Agent.</p>
                    
                    <h2>Deployment Options</h2>
                    
                    <h3>Cloud Deployment</h3>
                    <p>The easiest way to deploy your agent is through our managed cloud service:</p>
                    <ol>
                      <li>Navigate to the Deployment tab in the Agent Builder</li>
                      <li>Click "Deploy to Cloud"</li>
                      <li>Select your preferred region and scaling options</li>
                      <li>Click "Deploy"</li>
                    </ol>
                    <p>Your agent will be deployed with a unique endpoint URL.</p>
                    
                    <h3>Self-Hosted Deployment</h3>
                    <p>For organizations with specific compliance or security requirements:</p>
                    
                    <h4>Docker</h4>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`# Pull the agent image
docker pull agent-platform/data-analysis:latest

# Run the container
docker run -p 8080:8080 -e API_KEY=your_api_key \\
  -e DB_CONNECTION=your_db_connection_string \\
  agent-platform/data-analysis:latest`}</code></pre>
                    </div>
                    
                    <h4>Kubernetes</h4>
                    <div className={`p-4 rounded-md mb-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
                      <pre><code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: data-analysis-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: data-analysis-agent
  template:
    metadata:
      labels:
        app: data-analysis-agent
    spec:
      containers:
      - name: agent
        image: agent-platform/data-analysis:latest
        ports:
        - containerPort: 8080
        env:
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: agent-secrets
              key: api-key
        - name: DB_CONNECTION
          valueFrom:
            secretKeyRef:
              name: agent-secrets
              key: db-connection`}</code></pre>
                    </div>
                    
                    <h2>Environment Variables</h2>
                    <table className={`min-w-full divide-y ${
                      isDark ? 'divide-dark-border' : 'divide-gray-300'
                    }`}>
                      <thead>
                        <tr>
                          <th className="text-left">Variable</th>
                          <th className="text-left">Description</th>
                          <th className="text-left">Required</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-dark-border' : 'divide-gray-200'}`}>
                        <tr>
                          <td><code>API_KEY</code></td>
                          <td>Authentication key for API access</td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td><code>DB_CONNECTION</code></td>
                          <td>Database connection string</td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td><code>LOG_LEVEL</code></td>
                          <td>Logging verbosity (debug, info, warn, error)</td>
                          <td>No</td>
                        </tr>
                        <tr>
                          <td><code>PORT</code></td>
                          <td>Port for the agent service</td>
                          <td>No (default: 8080)</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <h2>Monitoring</h2>
                    <p>The agent exposes Prometheus-compatible metrics at the <code>/metrics</code> endpoint, including:</p>
                    <ul>
                      <li>Request counts and response times</li>
                      <li>Error rates</li>
                      <li>Resource utilization</li>
                      <li>Dataset sizes and query complexity</li>
                    </ul>
                    
                    <h2>Scaling</h2>
                    <p>The agent can be scaled horizontally by increasing the number of replicas in your container orchestration system, or vertically by allocating more resources to each instance.</p>
                  </div>
                )}
              </div>
            ) : (
              // Edit mode
              <div className="prose max-w-none">
                <textarea 
                  className={`w-full h-full p-4 border rounded-md ${
                    isDark 
                      ? 'bg-dark-surface border-dark-border text-dark-text' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  defaultValue={`# ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}

This is the editable content for the ${activeSection} section. In a real application, this would be a rich text editor with full markdown support.

## Edit Mode

You can modify the content here and click "Preview" to see the rendered version.

### Example Formatting

- Bullet points
- **Bold text**
- *Italic text*

`}
                  rows={20}
                ></textarea>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;