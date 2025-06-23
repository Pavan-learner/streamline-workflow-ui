
import { create } from 'zustand';
import { Node, Edge, Connection } from '@xyflow/react';

export interface AutomationNode extends Node {
  data: {
    label: string;
    category: string;
    type: 'trigger' | 'action';
    description?: string;
    isActive: boolean;
  };
}

interface AutomationStore {
  nodes: AutomationNode[];
  edges: Edge[];
  isModalOpen: boolean;
  selectedCategory: string;
  nodeCounter: number;
  displayMode: 'vertical' | 'horizontal';
  isNodeSettingsOpen: boolean;
  selectedNodeId: string | null;
  
  setNodes: (nodes: AutomationNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Omit<AutomationNode, 'id'>) => void;
  toggleNodeActive: (nodeId: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setSelectedCategory: (category: string) => void;
  setDisplayMode: (mode: 'vertical' | 'horizontal') => void;
  onConnect: (connection: Connection) => void;
  saveFlow: () => string;
  loadFlow: (flowData: string) => void;
  openNodeSettings: (nodeId: string) => void;
  closeNodeSettings: () => void;
  updateNodeSettings: (nodeId: string, updates: { label?: string; description?: string }) => void;
}

export const useAutomationStore = create<AutomationStore>((set, get) => ({
  nodes: [],
  edges: [],
  isModalOpen: false,
  selectedCategory: 'CRM',
  nodeCounter: 0,
  displayMode: 'vertical',
  isNodeSettingsOpen: false,
  selectedNodeId: null,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (nodeData) => {
    const { nodeCounter, nodes, edges } = get();
    const newNodeId = `node-${nodeCounter}`;
    
    // Calculate position based on display mode and existing nodes
    let position = { x: 200, y: 100 };
    if (nodes.length > 0) {
      const { displayMode } = get();
      
      if (displayMode === 'vertical') {
        // Center nodes horizontally, stack vertically
        position = {
          x: 200,
          y: 100 + (nodes.length * 180)
        };
      } else {
        // Center nodes vertically, arrange horizontally
        position = {
          x: 100 + (nodes.length * 280),
          y: 200
        };
      }
    }
    
    const newNode: AutomationNode = {
      ...nodeData,
      id: newNodeId,
      position,
      data: {
        ...nodeData.data,
        isActive: true,
      },
    };
    
    // Auto-connect to the last node if one exists
    const newEdges = [...edges];
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: lastNode.id,
        target: newNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      };
      newEdges.push(newEdge);
    }
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
      edges: newEdges,
      nodeCounter: nodeCounter + 1,
      isModalOpen: false,
    }));
  },
  
  toggleNodeActive: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, isActive: !node.data.isActive } }
          : node
      ),
    }));
  },
  
  setDisplayMode: (mode) => {
    const { nodes } = get();
    let updatedNodes = [...nodes];
    
    // Improved alignment for display modes
    updatedNodes = updatedNodes.map((node, index) => {
      if (mode === 'vertical') {
        return {
          ...node,
          position: { x: 200, y: 100 + (index * 180) }
        };
      } else {
        return {
          ...node,
          position: { x: 100 + (index * 280), y: 200 }
        };
      }
    });
    
    set({ displayMode: mode, nodes: updatedNodes });
  },
  
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  onConnect: (connection) => {
    const newEdge: Edge = {
      id: `edge-${Date.now()}`,
      source: connection.source!,
      target: connection.target!,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
    };
    
    set((state) => ({
      edges: [...state.edges, newEdge],
    }));
  },
  
  openNodeSettings: (nodeId: string) => {
    set({ isNodeSettingsOpen: true, selectedNodeId: nodeId });
  },
  
  closeNodeSettings: () => {
    set({ isNodeSettingsOpen: false, selectedNodeId: null });
  },
  
  updateNodeSettings: (nodeId: string, updates: { label?: string; description?: string }) => {
    set((state) => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...(updates.label && { label: updates.label }),
                ...(updates.description !== undefined && { description: updates.description }),
              }
            }
          : node
      ),
    }));
  },
  
  saveFlow: () => {
    const { nodes, edges } = get();
    return JSON.stringify({ nodes, edges }, null, 2);
  },
  
  loadFlow: (flowData) => {
    try {
      const { nodes, edges } = JSON.parse(flowData);
      set({ nodes, edges });
    } catch (error) {
      console.error('Failed to load flow data:', error);
    }
  },
}));
