import React, { useState } from "react";
import { nodeTypes, colorMap } from "../types/nodeTypes";
import { ChevronDown, ChevronUp, Zap, Upload, Database, Brain, Send, FileText, Code, File } from 'lucide-react';

export default function Sidebar() {
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCollapse = (nodeType: string) => {
    setCollapsedNodes((prevState) => ({
      ...prevState,
      [nodeType]: !prevState[nodeType],
    }));
  };

  const onDragStart = (event: React.DragEvent, nodeType: string, subType?: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    if (subType) {
      event.dataTransfer.setData("application/subtype", subType);
    }
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-72 h-screen overflow-y-auto bg-white border-r border-gray-200 p-4 select-none shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 sticky top-0 bg-white z-10 pb-2">
        AI Pipeline Components
      </h3>
      <div className="space-y-4">
        {nodeTypes.map((node) => (
          <div key={node.type} className="rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
            <div
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                colorMap[node.type as keyof typeof colorMap] || 'border-gray-200 bg-gray-50'
              } cursor-move hover:shadow-md`}
              draggable
              onDragStart={(event) => onDragStart(event, node.type)}
              onClick={() => node.subTypes && toggleCollapse(node.type)}
            >
              <div className="flex items-center space-x-3">
                <node.icon className="w-6 h-6 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-800">{node.label}</span>
                  <p className="text-sm text-gray-500 mt-0.5">{node.description}</p>
                </div>
              </div>
              {node.subTypes && (
                <span className="text-gray-400 transition-transform duration-200 ease-in-out transform">
                  {collapsedNodes[node.type] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              )}
            </div>
            {node.subTypes && (
              <div
                className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  collapsedNodes[node.type] ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'
                }`}
              > 
                {node.subTypes.map((subType) => (
                  <div
                    key={subType.type}
                    className={`flex items-center p-2 ml-2 rounded-lg cursor-move hover:shadow-sm transition-all duration-200 ${
                      colorMap[subType.type as keyof typeof colorMap] || 'bg-gray-50'
                    }`}
                    draggable
                    onDragStart={(event) => onDragStart(event, node.type, subType.type)}
                  >
                    <div className="flex items-center space-x-3">
                      {subType.icon && React.createElement(subType.icon, { className: "w-5 h-5 text-blue-600 opacity-70" })}
                      <div>
                        <span className="font-medium text-gray-700">{subType.label}</span>
                        <p className="text-sm text-gray-500 mt-0.5">{subType.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

