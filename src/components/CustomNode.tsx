import React from 'react';
import { Handle, Position } from 'reactflow';
import { iconMap, colorMap } from '../types/nodeTypes';

export interface CustomNodeProps {
  data: {
    label: string;
    type: string;
    subtype?: string;
    image?: string;
  };
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const { type, subtype, label, image } = data;

  // Determine icon and color for the node or subtype
  const Icon = iconMap[subtype || type as keyof typeof iconMap];
  const colors = colorMap[subtype || type as keyof typeof colorMap];

  if (!Icon || !colors) {
    return null;
  }

  console.log("icons", colorMap[subtype])
  return (
    <div
      className={`p-4 shadow-md rounded-md border-2 ${colors} flex flex-col items-center`}
    >
      {/* Top handle for connecting nodes */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-500" />

      {/* Icon or Image */}
      <div className="flex flex-col items-center mb-2">
        {image ? (
          <img src={image} alt={label} className="w-10 h-10 object-contain" />
        ) : (
          Icon && <Icon className="w-10 h-10 text-blue-600" />
        )}
      </div>

      {/* Label, Type, and Subtype */}
      <div className="text-center">
        <div className="text-base font-semibold">{subtype ? subtype:label}</div>
        <div className="text-sm text-gray-600">{type}</div>
      </div>

      {/* Bottom handle for connecting nodes */}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-500" />
    </div>
  );
};

export default CustomNode;
