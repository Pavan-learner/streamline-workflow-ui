
import React, { useState } from 'react';
import { useAutomationStore } from '../store/automationStore';
import { Plus, Download, Upload, Workflow, Zap, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { openModal, saveFlow, loadFlow, nodes, edges } = useAutomationStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);

  const handleSaveFlow = () => {
    const flowData = saveFlow();
    const blob = new Blob([flowData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'automation-flow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadFlow = () => {
    if (jsonInput.trim()) {
      loadFlow(jsonInput);
      setJsonInput('');
      setShowJsonInput(false);
    }
  };

  const triggerCount = nodes.filter(node => node.data.type === 'trigger').length;
  const actionCount = nodes.filter(node => node.data.type === 'action').length;

  return (
    <div className={`
      bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col
      ${isCollapsed ? 'w-16' : 'w-80'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Automation Builder</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Stats */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Triggers</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{triggerCount}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Actions</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-1">{actionCount}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Actions */}
      <div className="flex-1 p-4 space-y-4">
        <button
          onClick={openModal}
          className={`
            w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center space-x-2
            ${isCollapsed ? 'p-3' : 'p-4'}
          `}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Add Node</span>}
        </button>

        {!isCollapsed && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Flow Actions</h3>
              
              <button
                onClick={handleSaveFlow}
                className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Flow</span>
              </button>

              <button
                onClick={() => setShowJsonInput(!showJsonInput)}
                className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import Flow</span>
              </button>

              {showJsonInput && (
                <div className="space-y-2">
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON flow data here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleLoadFlow}
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Load Flow
                  </button>
                </div>
              )}
            </div>

            {/* Node Count Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Flow Summary</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Total Nodes: {nodes.length}</div>
                <div>Total Connections: {edges.length}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
