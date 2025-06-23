
import React, { useState } from 'react';
import { useAutomationStore } from '../store/automationStore';
import { Plus, Workflow, Zap, Settings, ChevronLeft, ChevronRight, Rows, Columns } from 'lucide-react';
import { Button } from './ui/button';

const Sidebar: React.FC = () => {
  const { 
    openModal, 
    nodes, 
    displayMode, 
    setDisplayMode 
  } = useAutomationStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const triggerCount = nodes.filter(node => node.data.type === 'trigger').length;
  const actionCount = nodes.filter(node => node.data.type === 'action').length;
  const activeNodes = nodes.filter(node => node.data.isActive).length;

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

      {/* Display Mode Controls */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Layout</h3>
          <div className="flex space-x-2">
            <Button
              onClick={() => setDisplayMode('vertical')}
              variant={displayMode === 'vertical' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 flex items-center space-x-2"
            >
              <Rows className="w-4 h-4" />
              <span>Vertical</span>
            </Button>
            <Button
              onClick={() => setDisplayMode('horizontal')}
              variant={displayMode === 'horizontal' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 flex items-center space-x-2"
            >
              <Columns className="w-4 h-4" />
              <span>Horizontal</span>
            </Button>
          </div>
        </div>
      )}

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
          <div className="bg-green-50 p-3 rounded-lg mt-4">
            <div className="text-sm font-medium text-green-900">Active Nodes</div>
            <div className="text-2xl font-bold text-green-600 mt-1">{activeNodes}/{nodes.length}</div>
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
      </div>
    </div>
  );
};

export default Sidebar;
