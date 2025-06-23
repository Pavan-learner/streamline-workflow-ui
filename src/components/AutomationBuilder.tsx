
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useAutomationStore } from '../store/automationStore';
import AutomationNodeComponent from './AutomationNode';
import NodeModal from './NodeModal';
import Sidebar from './Sidebar';

const nodeTypes = {
  automation: AutomationNodeComponent,
};

const AutomationBuilder: React.FC = () => {
  const { nodes, edges, setNodes, setEdges, onConnect } = useAutomationStore();
  const [localNodes, , onNodesChange] = useNodesState(nodes);
  const [localEdges, , onEdgesChange] = useEdgesState(edges);

  // Sync local state with store
  React.useEffect(() => {
    setNodes(localNodes);
  }, [localNodes, setNodes]);

  React.useEffect(() => {
    setEdges(localEdges);
  }, [localEdges, setEdges]);

  const handleConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      }, localEdges);
      setEdges(newEdge);
      onConnect(params);
    },
    [localEdges, setEdges, onConnect]
  );

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 relative">
        <ReactFlow
          nodes={localNodes}
          edges={localEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
          }}
        >
          <Controls className="bg-white border border-gray-200 rounded-lg shadow-sm" />
          <MiniMap 
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
            nodeColor={(node) => {
              if (node.data.type === 'trigger') return '#3b82f6';
              switch (node.data.category) {
                case 'CRM': return '#8b5cf6';
                case 'Contact': return '#10b981';
                case 'Calendar': return '#f59e0b';
                case 'LMS': return '#6366f1';
                case 'Database': return '#ef4444';
                default: return '#6b7280';
              }
            }}
          />
          <Background 
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#e5e7eb"
          />
        </ReactFlow>

        <NodeModal />
      </div>
    </div>
  );
};

export default AutomationBuilder;
