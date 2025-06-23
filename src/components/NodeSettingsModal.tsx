
import React, { useState, useEffect } from 'react';
import { useAutomationStore } from '../store/automationStore';
import { X, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface NodeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
}

const NodeSettingsModal: React.FC<NodeSettingsModalProps> = ({
  isOpen,
  onClose,
  nodeId,
}) => {
  const { nodes, updateNodeSettings } = useAutomationStore();
  const [nodeName, setNodeName] = useState('');
  const [nodeDescription, setNodeDescription] = useState('');

  const currentNode = nodes.find(node => node.id === nodeId);

  useEffect(() => {
    if (currentNode) {
      setNodeName(currentNode.data.label);
      setNodeDescription(currentNode.data.description || '');
    }
  }, [currentNode]);

  const handleSave = () => {
    if (nodeId) {
      updateNodeSettings(nodeId, {
        label: nodeName,
        description: nodeDescription,
      });
      onClose();
    }
  };

  if (!currentNode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Update Node Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Node Name
            </label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter node name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={nodeDescription}
              onChange={(e) => setNodeDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter description..."
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Type:</strong> {currentNode.data.type}</div>
              <div><strong>Category:</strong> {currentNode.data.category}</div>
              <div><strong>Status:</strong> {currentNode.data.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeSettingsModal;
