
import { create } from 'zustand';
import { Node, Edge, Connection } from '@xyflow/react';

export interface AutomationNode extends Node {
  data: {
    label: string;
    category: string;
    type: 'trigger' | 'action';
    description?: string;
  };
}

interface AutomationStore {
  nodes: AutomationNode[];
  edges: Edge[];
  isModalOpen: boolean;
  selectedCategory: string;
  nodeCounter: number;
  
  setNodes: (nodes: AutomationNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Omit<AutomationNode, 'id'>) => void;
  openModal: () => void;
  closeModal: () => void;
  setSelectedCategory: (category: string) => void;
  onConnect: (connection: Connection) => void;
  saveFlow: () => string;
  loadFlow: (flowData: string) => void;
}

export const useAutomationStore = create<AutomationStore>((set, get) => ({
  nodes: [],
  edges: [],
  isModalOpen: false,
  selectedCategory: 'CRM',
  nodeCounter: 0,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (nodeData) => {
    const { nodeCounter } = get();
    const newNode: AutomationNode = {
      ...nodeData,
      id: `node-${nodeCounter}`,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
    };
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
      nodeCounter: nodeCounter + 1,
      isModalOpen: false,
    }));
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
