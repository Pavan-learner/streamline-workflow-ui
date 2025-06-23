
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { AutomationNode } from '../store/automationStore';

interface Props {
  data: AutomationNode['data'];
}

const getNodeColor = (type: string, category: string) => {
  if (type === 'trigger') {
    return 'bg-blue-500 border-blue-600';
  }
  
  switch (category) {
    case 'CRM':
      return 'bg-purple-500 border-purple-600';
    case 'Contact':
      return 'bg-green-500 border-green-600';
    case 'Calendar':
      return 'bg-yellow-500 border-yellow-600';
    case 'LMS':
      return 'bg-indigo-500 border-indigo-600';
    case 'Database':
      return 'bg-red-500 border-red-600';
    default:
      return 'bg-gray-500 border-gray-600';
  }
};

const AutomationNodeComponent: React.FC<Props> = ({ data }) => {
  const colorClass = getNodeColor(data.type, data.category);
  
  return (
    <div className={`
      px-4 py-3 rounded-2xl shadow-md border-2 min-w-[200px] max-w-[250px]
      ${colorClass} text-white
      hover:shadow-lg hover:scale-105 transition-all duration-200
      cursor-pointer
    `}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-white border-2 border-current"
      />
      
      <div className="flex flex-col">
        <div className="text-xs opacity-80 uppercase tracking-wide mb-1">
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
