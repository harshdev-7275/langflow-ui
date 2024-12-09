import React from 'react';
import { nodeTypes } from '../types/nodeTypes';

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4">
      {/* <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Pipeline Components</h3> */}
      <div className="space-y-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <node.icon className="w-6 h-6 mr-3 text-blue-600" />
            <div>
              <span className="font-medium text-gray-800">{node.label}</span>
              <p className="text-sm text-gray-500">{node.description}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
