
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { AutomationNode } from '../store/automationStore';
import { useAutomationStore } from '../store/automationStore';
import { Switch } from './ui/switch';
import { Power, Settings } from 'lucide-react';

interface Props {
  id: string;
  data: AutomationNode['data'];
}

const getNodeColor = (type: string, category: string, isActive: boolean) => {
  const opacity = isActive ? '' : ' opacity-50';
  
  if (type === 'trigger') {
    return `bg-blue-500 border-blue-600${opacity}`;
  }
  
  switch (category) {
    case 'CRM':
      return `bg-purple-500 border-purple-600${opacity}`;
    case 'Contact':
      return `bg-green-500 border-green-600${opacity}`;
    case 'Calendar':
      return `bg-yellow-500 border-yellow-600${opacity}`;
    case 'LMS':
      return `bg-indigo-500 border-indigo-600${opacity}`;
    case 'Database':
      return `bg-red-500 border-red-600${opacity}`;
    default:
      return `bg-gray-500 border-gray-600${opacity}`;
  }
};

const AutomationNodeComponent: React.FC<Props> = ({ id, data }) => {
  const { toggleNodeActive, openNodeSettings } = useAutomationStore();
  const colorClass = getNodeColor(data.type, data.category, data.isActive);
  
  const handleNodeClick = (e: React.MouseEvent) => {
    // Prevent opening settings when clicking on the switch or settings icon
    if ((e.target as HTMLElement).closest('[role="switch"]') || 
        (e.target as HTMLElement).closest('.settings-icon')) {
      return;
    }
    openNodeSettings(id);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openNodeSettings(id);
  };
  
  return (
    <div 
      className={`
        px-4 py-3 rounded-2xl shadow-md border-2 w-[200px] h-[120px]
        ${colorClass} text-white
        hover:shadow-lg cursor-pointer relative
      `}
      onClick={handleNodeClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-white border-2 border-current"
      />
      
      {/* Toggle Switch */}
      <div className="absolute top-2 right-2">
        <Switch
          checked={data.isActive}
          onCheckedChange={() => toggleNodeActive(id)}
          className="scale-75"
        />
      </div>
      
      {/* Settings Icon */}
      <div 
        className="absolute top-2 right-10 settings-icon cursor-pointer p-1 rounded hover:bg-black/20 transition-colors"
        onClick={handleSettingsClick}
      >
        <Settings className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-col pt-4">
        <div className="text-xs opacity-80 uppercase tracking-wide mb-1 flex items-center gap-1">
          <Power className="w-3 h-3" />
          {data.type} • {data.category}
        </div>
        <div className="font-semibold text-sm leading-tight">
          {data.label}
        </div>
        {data.description && (
          <div className="text-xs opacity-90 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}
        <div className="text-xs mt-2 opacity-75">
          Status: {data.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-white border-2 border-current"
      />
    </div>
  );
};

export default AutomationNodeComponent;
