
import { Handle, Position } from 'reactflow';
import { iconMap, colorMap } from '../types/nodeTypes';

interface CustomNodeProps {
  data: {
    label: string;
    type: string;
  };
}

export default function CustomNode({ data }: CustomNodeProps) {
  // Fallback for undefined or incorrect types
  const Icon = iconMap[data.type as keyof typeof iconMap] || null;
  const colors = colorMap[data.type as keyof typeof colorMap] || 'border-gray-400 bg-gray-50';

  console.log('CustomNode Data:', data); // Debugging log

  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg border-2 ${colors}`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-gray-400" 
      />
      <div className="flex items-center">
        {Icon && <Icon className="w-6 h-6 mr-3" />}
        <div>
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-sm text-gray-600">{data.type}</div>
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-gray-400" 
      />
    </div>
  );
}
