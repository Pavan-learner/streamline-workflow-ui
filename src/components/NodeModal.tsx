
import React, { useState } from 'react';
import { useAutomationStore } from '../store/automationStore';
import { nodeTemplates, categories } from '../data/nodeTemplates';
import { X, Search, Zap, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const NodeModal: React.FC = () => {
  const { isModalOpen, closeModal, addNode, selectedCategory, setSelectedCategory } = useAutomationStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = nodeTemplates[selectedCategory]?.filter(template =>
    template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddNode = (template: any) => {
    addNode({
      type: 'automation',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        label: template.label,
        category: template.category,
        type: template.type,
        description: template.description,
      },
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add Node to Automation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search actions and triggers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-1 border-b border-gray-200">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleAddNode(template)}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${template.type === 'trigger' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}
                    `}>
                      {template.type === 'trigger' ? <Zap className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {template.description}
                      </p>
                      <span className={`
                        inline-block px-2 py-1 text-xs rounded-full mt-2
                        ${template.type === 'trigger' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                      `}>
                        {template.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeModal;
