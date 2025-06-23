
import React, { useState } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useAutomationStore } from '../store/automationStore';
import { nodeTemplates, categories } from '../data/nodeTemplates';
import { X, Search, Zap, Settings } from 'lucide-react';

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
      data: {
        label: template.label,
        category: template.category,
        type: template.type,
        description: template.description,
      },
    });
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex items-center justify-between p-6 border-b">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Add Node to Automation
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
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
                  </div>

                  <Tab.Group selectedIndex={categories.indexOf(selectedCategory)} onChange={(index) => setSelectedCategory(categories[index])}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
                      {categories.map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                            ${selected
                              ? 'bg-white text-blue-700 shadow'
                              : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                            }`
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>

                    <Tab.Panels>
                      {categories.map((category) => (
                        <Tab.Panel key={category}>
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
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NodeModal;
