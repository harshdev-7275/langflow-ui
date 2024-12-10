import React from "react";
import { Handle, Position } from "reactflow";
import { iconMap, colorMap } from "../types/nodeTypes";
import "../index.css"

export interface CustomNodeProps {
  data: {
    label: string;
    type: string;
    subtype?: string;
    image?: string;
    inputNotches?: { type: string; label: string; color: string }[];
    outputNotches?: { type: string; label: string; color: string }[];
  };
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const { type, subtype, label, image, inputNotches, outputNotches } = data;

  // Determine icon and color for the node or subtype
  const Icon = iconMap[subtype || (type as keyof typeof iconMap)];
  const colors = colorMap[subtype || (type as keyof typeof colorMap)];
  console.log(Icon);

  return (
    <div
      className={`p-4 shadow-md rounded-md border-2 min-w-[100px] min-h-[100px] ${colors} flex flex-col items-center relative`}
    >
      {/* Input handles */}
      <div className="absolute top-0 left-0 right-0 flex justify-around -mt-2">
        {inputNotches?.map((notch, index) => (
          <Handle
            key={index}
            type="target"
            position={Position.Top}
            id={notch.type}
            style={{
              background: notch.color,
              boxShadow: `0 0 10px ${notch.color}`,
              borderColor:`rgb(255, 255, 255)`,
              borderRadius:`100%`,
              WebkitBoxShadow:`${notch.color} 0px 0px 0px 0px, ${notch.color} 0px 0px 8px 7px`,
              opacity:`1`,
            }}
            className="w-3 h-3 rounded-full"
          ></Handle>
        ))}
      </div>

      {/* Icon or Image */}
      <div className="flex flex-col items-center mb-2 mt-4">
        {image ? (
          <>{Icon && <Icon className="w-10 h-10 text-blue-600" />}</>
        ) : (
          // <img src={image} alt={label} className="w-10 h-10 object-contain" />
          Icon && <Icon className="w-10 h-10 text-blue-600" />
        )}
      </div>

      {/* Label, Type, and Subtype */}
      <div className="text-center">
        <div className="text-base font-semibold">
          {subtype ? subtype : label}
        </div>
        <div className="text-sm text-gray-600">{type}</div>
      </div>

      {/* Output handles */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around -mb-2">
        {outputNotches?.map((notch, index) => (
          <Handle
            key={index}
            type="source"
            position={Position.Bottom}
            id={notch.type}
            style={{ 
              background: notch.color,
              boxShadow: `0 0 10px ${notch.color}`,
              borderColor:`rgb(255, 255, 255)`,
              borderRadius:`100%`,
              WebkitBoxShadow:`${notch.color} 0px 0px 0px 0px, ${notch.color} 0px 0px 8px 7px`,
              opacity:`1`,
             }}
            className="w-3 h-3 rounded-full"
          >
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
              {notch.label}
            </div> */}
          </Handle>
        ))}
      </div>
    </div>
  );
};

export default CustomNode;
