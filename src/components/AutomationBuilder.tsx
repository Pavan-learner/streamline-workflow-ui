
import React, { useCallback, useEffect } from 'react';
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
import NodeSettingsModal from './NodeSettingsModal';
import Sidebar from './Sidebar';

const nodeTypes = {
  automation: AutomationNodeComponent,
};

const AutomationBuilder: React.FC = () => {
  const { 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    onConnect,
    isNodeSettingsOpen,
    selectedNodeId,
    closeNodeSettings
  } = useAutomationStore();
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState([]);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState([]);

  // Sync store with local state
  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes, setLocalNodes]);

  useEffect(() => {
    setLocalEdges(edges);
  }, [edges, setLocalEdges]);

  // Sync local changes back to store
  useEffect(() => {
    setNodes(localNodes);
  }, [localNodes, setNodes]);

  useEffect(() => {
    setEdges(localEdges);
  }, [localEdges, setEdges]);

  const handleConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      }, localEdges);
      setLocalEdges(newEdges);
      onConnect(params);
    },
    [localEdges, setLocalEdges, onConnect]
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
              const isActive = node.data?.isActive !== false;
              const opacity = isActive ? 1 : 0.5;
              
              if (node.data.type === 'trigger') return `rgba(59, 130, 246, ${opacity})`;
              switch (node.data.category) {
                case 'CRM': return `rgba(139, 92, 246, ${opacity})`;
                case 'Contact': return `rgba(16, 185, 129, ${opacity})`;
                case 'Calendar': return `rgba(245, 158, 11, ${opacity})`;
                case 'LMS': return `rgba(99, 102, 241, ${opacity})`;
                case 'Database': return `rgba(239, 68, 68, ${opacity})`;
                default: return `rgba(107, 114, 128, ${opacity})`;
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
        <NodeSettingsModal 
          isOpen={isNodeSettingsOpen}
          onClose={closeNodeSettings}
          nodeId={selectedNodeId}
        />
      </div>
    </div>
  );
};

export default AutomationBuilder;
